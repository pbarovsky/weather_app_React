import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "aae5541070e86f4526a7113a1f6692c2";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchWeatherByCity",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: { q: city, units: "metric", lang: "ru", appid: API_KEY },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка запроса");
    }
  }
);

export const fetchWeatherByCoords = createAsyncThunk(
  "weather/fetchWeatherByCoords",
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: { lat, lon, units: "metric", lang: "ru", appid: API_KEY },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка запроса");
    }
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectWeatherData = (state) => state.weather.data;
export const selectWeatherLoading = (state) => state.weather.loading;
export const selectWeatherError = (state) => state.weather.error;
export const { actions, reducer } = weatherSlice;
