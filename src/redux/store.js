import { configureStore } from '@reduxjs/toolkit'
import typingSpeedTextSlice from './typingSpeedTextSlice';

export const store = configureStore({
    reducer: {
        typingSpeedText: typingSpeedTextSlice,
    },
});
