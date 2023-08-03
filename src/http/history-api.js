import api from "./api"

const resource = "api/history"

export const allHistory = () => api.get(resource);

//get 1 currency history on currency id
export const currencyHistory = (id) => api.get(`${resource}/${id}`);
