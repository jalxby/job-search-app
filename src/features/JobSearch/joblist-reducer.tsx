import React from "react";
import { Dispatch } from "redux";
import { jobAPI } from "../../api/api";

const initState: InitStateType = {
  objects: [],
  count: 0,
  page: 0,
};

export const JobListReducer = (
  state = initState,
  action: ActionType
): InitStateType => {
  switch (action.type) {
    case "jobList/SET-JOBS":
      return { ...state, objects: [...state.objects, ...action.objects] };
  }
  return state;
};

//action creators
export const setJobsAC = (objects: Array<JobItemType>) => {
  return { type: "jobList/SET-JOBS", objects };
};
//thunk creators
export const getJobsTC =
  (page: number = 0, count: number = 4) =>
  async (dispatch: Dispatch<ActionType>) => {
    try {
      const res = await jobAPI.getJobs(page, count);
      dispatch(setJobsAC(res.data.objects));
    } catch (e) {}
  };
//types
type InitStateType = {
  page: number;
  count: number;
  objects: Array<JobItemType>;
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
};
type ActionType = ReturnType<typeof setJobsAC>;
export default JobListReducer;
