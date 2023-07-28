import api from "./api"

const resource = "/currency"

export const allCurrencies = () => api.get(resource)

//!!!