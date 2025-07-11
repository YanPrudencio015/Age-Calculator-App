'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserValues {
    dayInput: number,
    monthInput: number,
    yearInput: number,
}

const initialInputsValue: UserValues = {
    dayInput: 0,
    monthInput: 0,
    yearInput: 0,
}

export const UserValuesSlice = createSlice({
    name: "UserValues",
    initialState: initialInputsValue,
    reducers: {
        getUservalue: (state, action: PayloadAction<UserValues>) => {
            state.dayInput = action.payload.dayInput;
            state.monthInput = action.payload.monthInput;
            state.yearInput = action.payload.yearInput;
        },

    }
});

export const { getUservalue} = UserValuesSlice.actions;
export default UserValuesSlice.reducer;