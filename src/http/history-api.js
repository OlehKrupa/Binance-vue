import api from "./api"

const resource = "/history"

export const allHistory = () => api.get(resource);

//get 1 currency history on currency id
export const currencyHistory = () => api.get(`${resource}/${id}`);
