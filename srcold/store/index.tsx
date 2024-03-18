import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';

import userSlice from './userSlice';
//import stores from './loginstore';
//import {userReducer} from '../redux/reducers/loginreducer';
//import { userReducer } from "c:/Users/chara/Downloads/vristo-react-main/vristo-react-main/src/redux/reducers/loginreducer";

export const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    //user:userReducer,
    //auth: userSlice,
    
});

export const store =configureStore({
    reducer: rootReducer, 
});

export default store
export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch=typeof store.dispatch;
