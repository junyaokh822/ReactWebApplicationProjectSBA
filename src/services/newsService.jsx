import axios from "axios";

const API_KEY = "7d630f61ea99490395f77df41161ad75";
const BASE_URL = "https://newsapi.org/v2";

export const fetchTopHeadlines = async (category = "general") => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country: "us",
        category: category,
        apiKey: API_KEY,
        pageSize: 20,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const searchNews = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        apiKey: API_KEY,
        pageSize: 20,
        sortBy: "relevancy",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching news:", error);
    throw error;
  }
};
