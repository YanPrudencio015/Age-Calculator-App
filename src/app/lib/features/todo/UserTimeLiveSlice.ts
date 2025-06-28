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

export const UserTimeLivedSlice = createSlice({
    name: "UserValues",
    initialState: initialInputsValue,
    reducers: {
        SendUserTime: (state, action: PayloadAction<UserValues>) => {
            state.dayInput = action.payload.dayInput;
            state.monthInput = action.payload.monthInput;
            state.yearInput = action.payload.yearInput;
        }
    }
});

export const {SendUserTime} = UserTimeLivedSlice.actions;
export default UserTimeLivedSlice.reducer;