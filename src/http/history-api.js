import api from "./api"

const resource = "api/history"

export const allHistory = () => api.get(resource);

export const currencyHistory = (id) => api.get(`${resource}/${id}`);
