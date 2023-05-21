import { AppRootStateType, ThunkType } from "../../../app/store";
import { Dispatch } from "redux";
import { jobAPI } from "../../../api/api";
import {
  setJobsAC,
  setJobsActionType,
  setPagesTotalAC,
  setPagesTotalActionType,
} from "../joblist-reducer";

const initState: InitStateType = {
  selectedIndustry: {} as IndustryType,
  payment_from: 0,
  payment_to: 0,
  industryList: [],
};

export const filterReducer = (
  state = initState,
  action: ActionType
): InitStateType => {
  switch (action.type) {
    case "filter/SET-INDUSTRY":
      return {
        ...state,
        selectedIndustry: state.industryList.filter(
          (i) => i.title_rus === action.selectedIndustryTitle
        )[0],
      };
    case "filter/SET-PAYMENT-FROM":
      return { ...state, payment_from: action.payment_from };
    case "filter/SET-PAYMENT-TO":
      return { ...state, payment_to: action.payment_to };
    case "filter/SET-INDUSTRY-LIST":
      return { ...state, industryList: action.industries };
    default:
      return state;
  }
};

//action creators
export const setIndustryAC = (selectedIndustryTitle: string) => {
  return { type: "filter/SET-INDUSTRY", selectedIndustryTitle } as const;
};
const setIndustryList = (industries: Array<IndustryType>) => {
  return { type: "filter/SET-INDUSTRY-LIST", industries } as const;
};
export const paymentFromAC = (payment_from: number) => {
  return { type: "filter/SET-PAYMENT-FROM", payment_from } as const;
};
export const paymentToAC = (payment_to: number) => {
  return { type: "filter/SET-PAYMENT-TO", payment_to } as const;
};
//thunk creators
export const getIndustryList =
  (): ThunkType => async (dispatch: Dispatch<ActionType>) => {
    try {
      const industries = await jobAPI.getIndustryList();
      dispatch(setIndustryList(industries.data));
    } catch (e) {}
  };
// export const applyFilter =
//   (filterValues: FilterValuesType): ThunkType =>
//   async (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
//     const state = getState();
//     const searchParams = {
//       page: 0,
//       count: 4,
//       ...filterValues,
//     };
//     try {
//       const res = await jobAPI.getJobs(searchParams);
//       dispatch(setJobsAC(res.data.objects));
//       const total = res.data.total >= 500 ? 500 : res.data.total;
//       const pagesTotal = total / state.jobs.count + 1;
//       dispatch(setPagesTotalAC(pagesTotal));
//     } catch (e) {}
//   };
//types
type InitStateType = {
  payment_from: number;
  payment_to: number;
  industryList: Array<IndustryType>;
  selectedIndustry: IndustryType;
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

type FilterValuesType = {
  industry: string;
  payment_from: number;
  payment_to: number;
};

type ActionType =
  | ReturnType<typeof setIndustryAC>
  | ReturnType<typeof paymentFromAC>
  | ReturnType<typeof paymentToAC>
  | ReturnType<typeof setIndustryList>
  | setJobsActionType
  | setPagesTotalActionType;

export default filterReducer;
