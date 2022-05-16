import { createSlice } from "@reduxjs/toolkit";
import cities from '../data/cities_turkey.json'
var shuffle = require('shuffle-array')

export const randomArrayMaker = () => {
    let goalTextArray = [];
    for (let i = 1; i < 1000; i++) {
        goalTextArray.push(cities[i - 1].name);
    }

    let shuffledGoalTextArray = shuffle(goalTextArray, { 'copy': true })
    let formattedShuffledGoalTextArray = shuffledGoalTextArray.map((item) => {
        return {
            text: item.match(/\S/g).join(''),
            validation: 'none'
        }
    })
    return formattedShuffledGoalTextArray
}

export const typingSpeedTextSlice = createSlice({
    name: 'typingSpeedText',
    initialState: {
        goalText: randomArrayMaker(),
        goalTextWordQueue: 1,
        goalTextLineQueue: 1,
        userInputText: '',
        userTime: 30,
        gameStatus: 'reset',
    },
    reducers: {
        changeUserInputText: (state, action) => {
            state.userInputText = action.payload;
        },
        changeUserTime: (state, action) => {
            state.userTime = action.payload
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
        checkUserInputControl: (state, action) => {
            state.goalTextLineQueue = action.payload;
        },
    }
});

export const { changeUserInputText, changeUserTime, changeGameStatus, changeGoalTextDisplay, changeGoalTextWordQueue, changeGoalTextLineQueue } = typingSpeedTextSlice.actions;
export default typingSpeedTextSlice.reducer;