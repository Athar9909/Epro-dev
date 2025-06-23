import apiService from "./apiService";

const getUser = async (payload) => {
  const data = await apiService.get("/user/getUser", payload);
  return data;
};

const getAllVendor = async (payload) => {
  const data = await apiService.get("/user/vendor", payload);
  return data;
};

const getCategories = async (payload) => {
  const data = await apiService.patch("/product/getCategory", payload);
  return data;
};

const getSubCategories = async (payload) => {
  const data = await apiService.get("/product/sub-categories", {
    params: payload,
  });
  return data;
};

const getProducts = async (payload) => {
  const data = await apiService.get("/product/products", payload);
  return data;
};

const getServices = async (payload) => {
  const data = await apiService.get("/product/services", payload);
  return data;
};

const getRentalServices = async (payload) => {
  const data = await apiService.get("/product/rental-services", {
    params: payload,
  });
  return data;
};

export default {
  getUser,
  getAllVendor,
  getCategories,
  getSubCategories,
  getProducts,
  getServices,
  getRentalServices,
};
