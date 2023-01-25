import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const LS_IS_AUTH = 'ria'

interface IsAuthorized {
    authorized: boolean;
    goToMane: boolean;
}

const initialState: IsAuthorized = {
    authorized: JSON.parse(localStorage.getItem(LS_IS_AUTH) ?? '{"authorized":false}'),
    goToMane: false
}

export const authSlice = createSlice({
    name: 'moments',
    initialState,
    reducers: {
        toggleAuth(state, action: PayloadAction<boolean>) {
            state.authorized = action.payload
            localStorage.setItem(LS_IS_AUTH, JSON.stringify(action.payload))
        },
        toggleGoToMane(state, action: PayloadAction<boolean>) {
            state.goToMane = action.payload
        }

    }
})

export const authActions = authSlice.actions
export const authReducers = authSlice.reducer