import { Dispatch } from "redux";
import { jobAPI, SearchParamsType } from "../../api/api";
import { AppRootStateType, AppThunkDispatch, ThunkType } from "../../app/store";
import { AppActionsType, setAppStatusAC } from "../../app/app-reducer";

const initState: InitStateType = {
  objects: [],
  favouriteObjectsIDS: [],
  favouriteObjects: [],
  pagesTotal: 0,
  total: 500,
  industryList: [],
  selectedIndustry: {} as IndustryType,
  currentPage: 1,
  searchParams: {
    count: 4,
    page: 1,
    keyword: "",
    catalogues: undefined,
    payment_from: 0,
    payment_to: 0,
    published: 1,
  },
};

export const jobListReducer = (
  state = initState,
  action: ActionType
): InitStateType => {
  switch (action.type) {
    case "SET-JOBS":
      return {
        ...state,
        objects: action.objects.map((o) =>
          state.favouriteObjectsIDS.includes(o.id)
            ? {
                ...o,
                isFavourite: true,
              }
            : { ...o, isFavourite: false }
        ),
      };
    case "SET-CURRENT-PAGE":
      return {
        ...state,
        currentPage: action.page,
      };
    case "SET-PAGES-TOTAL":
      return { ...state, pagesTotal: action.pagesTotal };
    case "SET-TOTAL-OBJECTS":
      return { ...state, total: action.total };
    case "SET-INDUSTRY-LIST":
      return { ...state, industryList: action.industries };
    case "SET-INDUSTRY":
      return {
        ...state,
        selectedIndustry: state.industryList.filter(
          (i) => i.title_rus === action.selectedIndustryTitle
        )[0],
      };
    case "SET-SEARCH-PARAMS":
      return {
        ...state,
        searchParams: { ...state.searchParams, ...action.searchParams },
      };
    case "ADD-TO-FAVOURITES":
      return {
        ...state,
        objects: state.objects.map((o) =>
          o.id === action.id ? { ...o, isFavourite: true } : o
        ),
        favouriteObjectsIDS: [...state.favouriteObjectsIDS, action.id],
      };
    case "REMOVE-FROM-FAVOURITES":
      return {
        ...state,
        objects: state.objects.map((o) =>
          o.id === action.id ? { ...o, isFavourite: false } : o
        ),
        favouriteObjectsIDS: state.favouriteObjectsIDS.filter(
          (o) => o !== action.id
        ),
      };
    case "SET-FAVOURITES":
      return {
        ...state,
        favouriteObjects: action.favourites.map((o) => ({
          ...o,
          isFavourite: true,
        })),
      };
    default:
      return state;
  }
};

//action creators
export const setIndustryAC = (selectedIndustryTitle: string) => {
  return { type: "SET-INDUSTRY", selectedIndustryTitle } as const;
};
export const addToFavouritesAC = (id: number) => {
  return { type: "ADD-TO-FAVOURITES", id } as const;
};
export const removeFromFavouritesAC = (id: number) => {
  return { type: "REMOVE-FROM-FAVOURITES", id } as const;
};
export const setJobsAC = (objects: Array<JobItemType>) => {
  return { type: "SET-JOBS", objects } as const;
};
export const setPagesTotalAC = (pagesTotal: number) => {
  return { type: "SET-PAGES-TOTAL", pagesTotal } as const;
};
const setCurrentPageAC = (page: number) => {
  return { type: "SET-CURRENT-PAGE", page } as const;
};
const setTotalObjectsAC = (total: number) => {
  return { type: "SET-TOTAL-OBJECTS", total } as const;
};
const setIndustryListAC = (industries: Array<IndustryType>) => {
  return { type: "SET-INDUSTRY-LIST", industries } as const;
};
const setSearchParamsAC = (searchParams: SearchParamsType) => {
  return { type: "SET-SEARCH-PARAMS", searchParams } as const;
};
const setFavourites = (favourites: Array<JobItemType>) => {
  return { type: "SET-FAVOURITES", favourites } as const;
};
//thunk creators

export const setPageTC =
  (page: number): ThunkType =>
  async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const params = {
      ...state.jobs.searchParams,
      page: page - 1,
    };
    try {
      dispatch(getJobsTC(params));
      dispatch(setCurrentPageAC(page));
    } catch (e) {}
  };
export const getJobsTC =
  (searchParams: SearchParamsType): ThunkType =>
  async (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"));
    const state = getState();
    const params: SearchParamsType = {
      ...state.jobs.searchParams,
      ...searchParams,
    };

    try {
      const res = await jobAPI.getJobs(params);
      dispatch(setJobsAC(res.data.objects));
      const total =
        res.data.total >= initState.total ? initState.total : res.data.total;
      const pagesTotal = total / searchParams.count + 1;
      dispatch(setPagesTotalAC(pagesTotal));
    } catch (e) {
    } finally {
      dispatch(setAppStatusAC("idle"));
    }
  };
export const getIndustryListTC =
  (): ThunkType => async (dispatch: Dispatch<ActionType>) => {
    try {
      const industries = await jobAPI.getIndustryList();
      dispatch(setIndustryListAC(industries.data));
    } catch (e) {}
  };
export const applySearchTC =
  (keyword: string): ThunkType =>
  async (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"));
    const state = getState();
    const params: SearchParamsType = {
      ...state.jobs.searchParams,
      page: 0,
      keyword,
    };
    try {
      const res = await jobAPI.getJobs(params);
      dispatch(setJobsAC(res.data.objects));
      dispatch(setSearchParamsAC(params));
      dispatch(setCurrentPageAC(1));
    } catch (e) {
    } finally {
      dispatch(setAppStatusAC("idle"));
    }
  };
export const applyFilterTC =
  (filter: FilterValues): ThunkType =>
  async (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"));
    const state = getState();
    let catalogues;
    if (filter.industry) {
      catalogues = state.jobs.industryList.filter(
        (i) => i.title_rus === filter.industry
      )[0].key;
    }

    const params: SearchParamsType = {
      ...state.jobs.searchParams,
      page: 0,
      payment_from: filter.payment_from,
      payment_to: filter.payment_to,
      catalogues,
    };
    try {
      const res = await jobAPI.getJobs(params);
      dispatch(setJobsAC(res.data.objects));
      dispatch(setSearchParamsAC(params));
      dispatch(setCurrentPageAC(1));
    } catch (e) {
    } finally {
      dispatch(setAppStatusAC("idle"));
    }
  };

export const getFavouritesTC =
  (ids: number[]): ThunkType =>
  async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"));
    try {
      if (ids.length !== 0) {
        const res = await jobAPI.getJobs({ ids });
        dispatch(setFavourites(res.data.objects));
      } else {
        dispatch(setFavourites([]));
      }
    } catch (e) {
    } finally {
      dispatch(setAppStatusAC("idle"));
    }
  };

export const getJobTC =
  (id: string): ThunkType =>
  async (dispatch: Dispatch<ActionType>) => {
    try {
      const res = await jobAPI.getJob(Number(id));
      dispatch(setJobsAC(res.data.objects));
    } catch (e) {}
  };
//types
type InitStateType = {
  objects: Array<ObjectType>;
  favouriteObjects: Array<ObjectType>;
  favouriteObjectsIDS: Array<number>;
  total: number;
  pagesTotal: number;
  industryList: Array<IndustryType>;
  selectedIndustry: IndustryType;
  searchParams: SearchParamsType;
  currentPage: number;
};

export type ObjectType = JobItemType & { isFavourite: boolean };

export type FilterValues = {
  industry: string;
  payment_from: number;
  payment_to: number;
};

export type JobItemType = {
  id: number;
  profession: string;
  firm_name: string;
  town: { title: string };
  type_of_work: { title: string };
  payment_to: number;
  payment_from: number;
  currency: string;
  vacancyRichText: string;
};

export type IndustryType = {
  title_rus: string;
  url_rus: string;
  title: string;
  title_trimmed: string;
  key: number;
  positions: Position[];
};

export interface Position {
  title_rus: string;
  url_rus: string;
  title: string;
  id_parent: number;
  key: number;
}

export type setJobsActionType = ReturnType<typeof setJobsAC>;
export type setPagesTotalActionType = ReturnType<typeof setPagesTotalAC>;
type ActionType =
  | setJobsActionType
  | setPagesTotalActionType
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setPagesTotalAC>
  | ReturnType<typeof setTotalObjectsAC>
  | ReturnType<typeof setIndustryListAC>
  | ReturnType<typeof setSearchParamsAC>
  | ReturnType<typeof setIndustryAC>
  | ReturnType<typeof addToFavouritesAC>
  | ReturnType<typeof removeFromFavouritesAC>
  | ReturnType<typeof setFavourites>
  | AppActionsType;
