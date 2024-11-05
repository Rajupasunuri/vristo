import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

//import userSlice from './userSlice';
//import stores from './loginstore';
//import {userReducer} from '../redux/reducers/loginreducer';
//import { userReducer } from "c:/Users/chara/Downloads/vristo-react-main/vristo-react-main/src/redux/reducers/loginreducer";
const serialize = (data: any) => JSON.stringify(data);
// Custom deserializer to parse JSON objects instead of strings
const deserialize = (data: any) => JSON.parse(data);
// const persistConfig = {
//     key: 'root',
//     storage,
// serialize, // Custom serializer
// deserialize, // Custom deserializer
// serialize: (data: any) => JSON.stringify(data), // Custom serializer
// deserialize: (data: any) => JSON.parse(data), // Custom deserializer
// };
export const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    //user:userReducer,
    //auth: userSlice,
});
// const persisteReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: rootReducer,
});
// const persistor = persistStore(store);
//persistor.persist();
// export { persistor };
export default store;
export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
