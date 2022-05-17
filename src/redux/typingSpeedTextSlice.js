import { createSlice } from "@reduxjs/toolkit";
import cities from '../data/cities_turkey.json'
var shuffle = require('shuffle-array')

export const randomArrayMaker = () => {
    let goalTextArray = [];
    let _12wordsControlArray = []
    for (let i = 1; i < 1801; i++) {
        _12wordsControlArray.push(cities[i - 1].name);
        if ((i - 1 + 12) % 12 === 0) {
            goalTextArray.push(_12wordsControlArray)
            _12wordsControlArray = []
        }
    }

    let shuffledGoalTextArray = shuffle(goalTextArray, { 'copy': true })
    let formattedShuffledGoalTextArray = shuffledGoalTextArray.map((item) => {
        return item.map((subItem) => {
            return {
                text: subItem.match(/\S/g).join(''),
                validation: 'none'
            }
        })
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
        userInputControl: false,
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
            state.goalText[state.goalTextLineQueue - 1] = action.payload;
        },
        changeGoalTextWordQueue: (state, action) => {
            state.goalTextWordQueue = action.payload;
        },
        changeGoalTextLineQueue: (state, action) => {
            state.goalTextLineQueue = action.payload;
        },
        checkUserInputControl: (state, action) => {
            state.userInputControl = action.payload;
        },
        resetGoalText: (state, action) => {
            state.goalText = action.payload;
        },
    }
});

export const { changeUserInputText, changeUserTime, changeGameStatus, changeGoalTextDisplay, changeGoalTextWordQueue, changeGoalTextLineQueue, resetGoalText, checkUserInputControl } = typingSpeedTextSlice.actions;
export default typingSpeedTextSlice.reducer;