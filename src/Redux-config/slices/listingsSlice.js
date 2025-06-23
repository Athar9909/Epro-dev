import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import lisitingService from "../apisModel/lisitingService";

const handleApiError = (error, defaultMessage) => {
  const message =
    error?.response?.data?.message || error?.message || defaultMessage;
  toast.error(message);
  return { error: true, message };
};

export const GetAllVendorData = createAsyncThunk(
  "listing/getAllVendors",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getAllVendor(payload);
      if (!response || response.error) throw new Error(response?.message);
      return response?.results?.user || response?.user || response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to fetch vendors."));
    }
  }
);

export const GetCategories = createAsyncThunk(
  "listing/getCategories",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getCategories(payload);
      if (!response || response.error) throw new Error(response?.message);
      return response?.results || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch categories.")
      );
    }
  }
);

export const GetSubCategories = createAsyncThunk(
  "listing/getSubCategories",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getSubCategories(payload);
      if (!response || response.error) throw new Error(response?.message);
      return response?.results || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch subcategories.")
      );
    }
  }
);

export const GetProducts = createAsyncThunk(
  "listing/getProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getProducts(payload);
      if (!response || response.error) throw new Error(response?.message);
      return response?.results || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch products.")
      );
    }
  }
);

export const GetServices = createAsyncThunk(
  "listing/getServices",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getServices(payload);
      if (!response || response.error) throw new Error(response?.message);
      return response?.results || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch services.")
      );
    }
  }
);

export const GetRentalServices = createAsyncThunk(
  "listing/getRentalServices",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getRentalServices(payload);
      if (!response || response.error) throw new Error(response?.message);
      return response?.results || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch rental services.")
      );
    }
  }
);

const initialState = {
  vendors: [],
  categories: [],
  subCategories: [],
  products: [],
  services: [],
  rentalServices: [],
  loading: false,
  error: null,
  message: null,
};

const listing = createSlice({
  name: "listing",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    logout: (state) => {
      state.vendors = [];
      state.categories = [];
      state.subCategories = [];
      state.products = [];
      state.services = [];
      state.rentalServices = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Vendors
      .addCase(GetAllVendorData.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllVendorData.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(GetAllVendorData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Categories
      .addCase(GetCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(GetCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // SubCategories
      .addCase(GetSubCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(GetSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Products
      .addCase(GetProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(GetProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Services
      .addCase(GetServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(GetServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Rental Services
      .addCase(GetRentalServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetRentalServices.fulfilled, (state, action) => {
        state.loading = false;
        state.rentalServices = action.payload;
      })
      .addCase(GetRentalServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { logout, clearError, clearMessage } = listing.actions;
export default listing.reducer;
