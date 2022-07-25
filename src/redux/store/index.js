import { configureStore } from '@reduxjs/toolkit';
import collapsedSlice from '../features/collapsed/collapsedSlice';
import loaddingSlice from '../features/loadding/loaddingSlice';

export default configureStore({
  reducer: {
    collapsed: collapsedSlice,
    loadding: loaddingSlice
  },
})