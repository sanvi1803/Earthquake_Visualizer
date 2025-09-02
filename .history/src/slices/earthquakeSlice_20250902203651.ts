import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export const fetchEarthquakes = createAsyncThunk(
  "earthquake/fetchEarthquakes",
  async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch earthquake data");
    return await res.json();
  }
);

const earthquakeSlice = createSlice({
  name: "earthquake",
  initialState: {
    data: null as any,
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarthquakes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEarthquakes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchEarthquakes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default earthquakeSlice.reducer;