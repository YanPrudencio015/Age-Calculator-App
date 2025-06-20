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
        SendUserTime: (state, action: PayloadAction<UserValues>) => {
            state.dayInput = action.payload.dayInput;
            state.monthInput = action.payload.monthInput;
            state.yearInput = action.payload.yearInput;
        },
        resetUserValues: (state) => {
            state.dayInput = 0;
            state.monthInput = 0;
            state.yearInput = 0;
        }
    }
});

export const { getUservalue, SendUserTime, resetUserValues } = UserValuesSlice.actions;
export default UserValuesSlice.reducer;