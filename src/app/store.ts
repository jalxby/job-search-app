import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { jobListReducer } from "../features/JobSearch/joblist-reducer";
import { loadStorage, saveToStorage } from "../utils/localstorage-utils";

const rootReducer = combineReducers({
  app: appReducer,
  jobs: jobListReducer,
});

export const store = legacy_createStore(
  rootReducer,
  { jobs: loadStorage("jobs") },
  applyMiddleware(thunkMiddleware)
);

store.subscribe(() => {
  saveToStorage("jobs", store.getState().jobs);
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;
