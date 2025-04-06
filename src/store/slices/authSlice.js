import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log('state.user before', state.user, action)
            state.user = action.payload
            console.log('state.user', state.user, action)
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('user')
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer