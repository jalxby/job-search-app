import axios from "axios";
import { JobItemType } from "../features/JobSearch/joblist-reducer";

const authParams: AuthParamsType = {
  login: "sergei.stralenia@gmail.com",
  password: "paralect123",
  client_id: 2356,
  client_secret:
    "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
  hr: 0,
};
const instance = axios.create({
  baseURL: "https://startup-summer-2023-proxy.onrender.com/2.0/",
  withCredentials: true,
  headers: {
    "x-secret-key": "GEU4nvd3rej*jeh.eqp",
    "X-Api-App-Id": authParams.client_secret,
  },
});

export const authAPI = {
  login() {
    return instance.get("oauth2/password", { params: authParams });
  },
};

export const jobAPI = {
  getJobs(params: SearchParamsType | number[]) {
    debugger;
    return instance.get<ResponseType>("vacancies", { params });
  },
  getIndustryList() {
    return instance.get("catalogues");
  },
  // getFavourites(favourites: number[]) {
  //   return instance.get<ResponseType>("vacancies");
  // },
};

export type SearchParamsType = {
  page: number;
  count: number;
  published: number;
  keyword: string;
  payment_from: number;
  payment_to: number;
  catalogues?: number;
};
type AuthParamsType = {
  login: string;
  password: string;
  client_id: number;
  client_secret: string;
  hr: number;
};

type ResponseType = {
  total: number;
  more: boolean;
  subscription_id: number;
  subscription_active: boolean;
  objects: Array<JobItemType>;
};
