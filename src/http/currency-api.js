import api from "./api"

const resource = "/currency"

export const allCurrencies = () => api.get(resource)

//export const createCurrency = (data) => api.post(resource, data);

export const getCurrency = (id) => api.get(`${resource}/${id}`);

//export const updateCurrency = (id, data) => api.put(`${resource}/${id}`, data);

//export const deleteCurrency = (id) => api.delete(`${resource}/${id}`);
