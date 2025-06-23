import apiService from "./apiService";

const getUser = async (userData) => {
  const data = await apiService.get("/user/getUser", userData);
  return data;
};
const getAllVendors = async (userData) => {
  const data = await apiService.get("/user/getUser", userData);
  return data;
};

export default {
  getUser,
  getAllVendors,
};
