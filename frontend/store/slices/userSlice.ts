import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice ({
    name: 'user',
    initialState: {
        fname: "",
        lname: "",
        email: "",
    },
    reducers: {
        fname_change: (state, action) => {
            state.fname = action.payload
        },
        lname_change: (state, action) => {
            state.lname = action.payload
        },
        email_change: (state, action) => {
            state.email = action.payload
        }
    }
})

export const { fname_change, lname_change, email_change } = userSlice.actions

export const selectUser = (state: { user: { fname: string; lname: string; email: string } }) => state.user

export default userSlice.reducer