import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk(
    'countries/fetchCountries',
    async () => {
        const res = await axios.get('https://restcountries.com/v2/all?fields=name,region,flag');
        return res.data;
    }
);

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        list: [],
        filtered: [],
        filterRegion: 'All',
        status: 'idle',
    },
    reducers: {
        filterByRegion: (state, action) => {
            state.filterRegion = action.payload;
            state.filtered = action.payload === 'All'
                ? state.list
                : state.list.filter(c => c.region === action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
                state.filtered = action.payload;
            });
    },
});

export const { filterByRegion } = countriesSlice.actions;
export default countries.reducer;
