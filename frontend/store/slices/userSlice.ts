import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice ({
    name: 'user',
    initialState: {
        fname: "",
        lname: "",
        email: "",
        birthday: "",
        phone_number: "",
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
        },
        birthday_change: (state, action) => {
            state.birthday = action.payload
        },
        phone_number_change: (state, action) => {
            state.phone_number = action.payload
        }
    }
})

export const { fname_change, lname_change, email_change, birthday_change, phone_number_change } = userSlice.actions

export const selectUser = (state: { user: { fname: string; lname: string; email: string } }) => state.user

export default userSlice.reducer