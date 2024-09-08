import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelData: [],
  selectedHotel: null,
};

const HotelData = createSlice({
  name: "hoteldata",
  initialState,
  reducers: {
    setHotelData: (state, action) => {
      state.hotelData = action.payload;
    },
    setSelectedHotel: (state, action) => {
      state.selectedHotel = action.payload;
    },
  },
});

export default HotelData;

export const { setHotelData, setSelectedHotel } = HotelData.actions;
