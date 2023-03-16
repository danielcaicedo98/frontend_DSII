import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const authSlice = createSlice({
    name:"authUser",
    initialState:{
        user: {}
    },
    reducers:{
        setUser:(state, action) =>{
            state.user = action.payload;
        }
    }
})

export default authSlice.reducer;

export const {setUser} =authSlice.actions;

export const fetchAuth = () => (dispatch) => {
    //aqui traer al usuario en login
    axios.get()
    .then((response) => {
        dispatch(setUser(response.data));
    })
};