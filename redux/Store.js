import { configureStore } from '@reduxjs/toolkit';
import CounterSlice from './CounterSlice';
import GetBlog from './SingleBlog';
import ContactReducer from './Contact'; // Correct import
import  LoginSlice  from './LoginSlice';
import  DashboardSlice  from './DashboardSlice';
import  SearchSlice  from './SearchSlice';

export const Store = configureStore({
    reducer: {
        counter: CounterSlice,
        SingleBlog: GetBlog,
        Contact: ContactReducer, 
        Login:LoginSlice,
        DashboardState:DashboardSlice,
        Search:SearchSlice
    },
});

export default Store;
