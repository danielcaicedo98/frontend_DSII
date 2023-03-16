import { configureStore } from "@reduxjs/toolkit";
import { authReducer} from "reducers/authReducer";
import authSlice from "reducers/authSlice";
import { userReducer } from "reducers/userReducer";

//reducers


export default configureStore({
    reducer:{
        auth: authSlice,
        users:userReducer
        
    }
});

