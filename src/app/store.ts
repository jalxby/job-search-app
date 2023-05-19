import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import JobListReducer from "../features/JobSearch/joblist-reducer";

const rootReducer = combineReducers({
  app: appReducer,
  jobs: JobListReducer,
});

export const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;
