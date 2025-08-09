import { createSlice } from '@reduxjs/toolkit';

// Load user from sessionStorage
const storedUser = JSON.parse(sessionStorage.getItem('user')) || null;

const userSlice = createSlice({
    name: 'user',
    initialState: { user: storedUser },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            sessionStorage.setItem('user', JSON.stringify(action.payload)); // Save to sessionStorage
        },
        logout: (state) => {
            state.user = null;
            sessionStorage.removeItem('user'); // Clear sessionStorage on logout
            sessionStorage.removeItem('token'); // Optional: remove token if stored
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
