import { configureStore } from '@reduxjs/toolkit';
import collapsedSlice from '../features/collapsed/collapsedSlice';

export default configureStore({
  reducer: {
    collapsed: collapsedSlice
  },
})