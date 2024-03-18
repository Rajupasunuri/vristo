// userSlice.js
/*import { createSlice ,} from '@reduxjs/toolkit';




const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { fetchUserSuccess } = userSlice.actions;
export default userSlice.reducer;*/
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface UserState {
//   user: User | null;
// }

// interface User {
//   // Define your user properties here
//   id:string;
//   mail:string;
//   mobile:string;




//   // Add other properties as needed
// }

// const initialState: UserState = {
//   user: null,
  
// };

// const userSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     fetchUserSuccess: (state, action: PayloadAction<User | null>) => {
//       state.user = action.payload;
//     },
//   },
// });

// export const { fetchUserSuccess } = userSlice.actions;
// export default userSlice.reducer;
// export type User = ReturnType<typeof userSlice.reducer>;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  mail: string;
  mobile: string;
  // Add other properties as needed
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'auth', // Adjusted the slice name to 'user' for consistency
  initialState,
  reducers: {
    fetchUserSuccess: (state, action: PayloadAction<User | null>) => {

      console.log("useslice",state);
      state.user = action.payload;
    },
  },
});

export const { fetchUserSuccess } = userSlice.actions;
export default userSlice.reducer;
export type RootState = ReturnType<typeof userSlice.reducer>; // Adjusted the type name to RootState for clarity
