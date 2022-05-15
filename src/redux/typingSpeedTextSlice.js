import { createSlice } from "@reduxjs/toolkit";


import cities from '../data/cities_turkey.json'
var shuffle = require('shuffle-array')

let goalTextArray = [];
for (let i = 1; i < 501; i++) {
    goalTextArray.push(cities[i - 1].name);
}

let shuffledGoalTextArray = shuffle(goalTextArray, { 'copy': true })

let formattedShuffledGoalTextArray = shuffledGoalTextArray.map((item) => {

    return {
        text: item,
        validation: 'none'
    }
})
export const typingSpeedTextSlice = createSlice({
    name: 'typingSpeedText',
    initialState: {
        goalText: formattedShuffledGoalTextArray,
        goalTextWordQueue: 1,
        goalTextLineQueue: 1,
        userInputText: '',
        userTime: 60,
        gameStatus: 'reset',
    },
    reducers: {
        changeUserInputText: (state, action) => {
            state.userInputText = action.payload;
            console.log("state.userInputText", state.userInputText)
        },
        changeUserTime: (state, action) => {
            console.log("chnageusertimeoluyor mu?", action.payload)
            state.userTime -= 1;
        },
        changeGameStatus: (state, action) => {
            state.gameStatus = action.payload;
        },
        changeGoalTextDisplay: (state, action) => {
            state.goalText = action.payload;
        },
        changeGoalTextWordQueue: (state, action) => {
            state.goalTextWordQueue = action.payload;
        },
        changeGoalTextLineQueue: (state, action) => {
            state.goalTextLineQueue = action.payload;
        },

    }
});

export const { changeUserInputText, changeUserTime, changeGameStatus, changeGoalTextDisplay, changeGoalTextWordQueue, changeGoalTextLineQueue } = typingSpeedTextSlice.actions;
export const goalText = (state) => state.typingSpeedText.goalText;
export const goalTextWordQueue = (state) => state.typingSpeedText.goalTextWordQueue;
export const goalTextLineQueue = (state) => state.typingSpeedText.goalTextLineQueue;
export const userInputText = (state) => state.typingSpeedText.userInputText;
export const userTime = (state) => state.typingSpeedText.userTime;
export const gameStatus = (state) => state.typingSpeedText.gameStatus;
export default typingSpeedTextSlice.reducer;