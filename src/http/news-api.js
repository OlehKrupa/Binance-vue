import api from "./api"

const resource = "api/news"

export const allNews = () => api.get(resource);

