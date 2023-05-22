const initialState: InitialStateType = {
  status: "idle",
  error: null,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case "SET-STATUS":
      return { ...state, status: action.status };
    case "SET-ERROR":
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
};

export const setAppErrorAC = (error: string | null) =>
  ({ type: "SET-ERROR", error } as const);
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: "SET-STATUS", status } as const);

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;

export type AppActionsType = SetAppErrorActionType | SetAppStatusActionType;
