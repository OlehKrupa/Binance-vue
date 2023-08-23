import api from "./api"

const resource = "api/user"

export const userPreferences = () => api.get(`${resource}/preferences`);

export const userHistory = () => api.get(`${resource}/history`);

export const userPreferencesUpdate = (selectedCurrencies) => api.put(`${resource}/preferences`, selectedCurrencies);

export const userSubscribe = () => api.patch(`${resource}/subscribe`);

export const unPremium = () => api.patch(`${resource}/unpremium`);

export const unStripe = () => api.get(`${resource}/unstripe`);

export const getPaymentSession = () => api.get(`${resource}/getSession`);
