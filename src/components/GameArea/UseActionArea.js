import React, { useEffect } from 'react'
import { Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { userInputText, userTime, changeUserInputText, goalTextWordQueue, goalText, changeGoalTextDisplay, changeGoalTextWordQueue, changeGoalTextLineQueue, goalTextLineQueue, gameStatus, changeGameStatus, changeUserTime } from '../../redux/typingSpeedTextSlice'

function UseActionArea() {
    const dispatch = useDispatch();
    const goalTextArr = useSelector(goalText);
    const userInputTextValue = useSelector(userInputText);
    const userTimeValue = useSelector(userTime);
    const gameStatusValue = useSelector(gameStatus);
    const goalTextWordQueueValue = useSelector(goalTextWordQueue);
    const goalTextLineQueueValue = useSelector(goalTextLineQueue);

    console.log("userInputTextValue", userInputTextValue)
    console.log("gameStatusValue", gameStatusValue)

    const handleUserInputText = (userInputText) => {
        dispatch(changeUserInputText(userInputText))
        dispatch(changeGameStatus('playing'))
        timer();
    }

    useEffect(() => {
        let formattedGoalTextArr = []
        function hasWhiteSpace(s) {
            return (/\s/).test(s);
        }
        if (userInputTextValue) {

            if (hasWhiteSpace(userInputTextValue)) {
                for (let i = 0; i < goalTextArr.length; i++) {
                    if (i == goalTextWordQueueValue - 1) {
                        if (goalTextArr[i].text == (userInputTextValue.trim())) {
                            formattedGoalTextArr.push({
                                text: goalTextArr[i].text,
                                validation: 'true',
                            })
                        } else {
                            formattedGoalTextArr.push({
                                text: goalTextArr[i].text,
                                validation: 'false',
                            })
                        }
                    } else if (i > goalTextWordQueueValue) {
                        formattedGoalTextArr.push({
                            text: goalTextArr[i].text,
                            validation: 'none',
                        })
                    } else {
                        formattedGoalTextArr.push(
                            goalTextArr[i]
                        )
                    }
                }
                dispatch(changeUserInputText(''))
                dispatch(changeGoalTextWordQueue(goalTextWordQueueValue + 1))
                if ((goalTextWordQueueValue) % 24 == 0) dispatch(changeGoalTextLineQueue(goalTextLineQueueValue + 2))

            } else {
                for (let i = 0; i < goalTextArr.length; i++) {
                    if (i == goalTextWordQueueValue - 1) {
                        formattedGoalTextArr.push({
                            text: goalTextArr[i].text,
                            validation: 'checking',
                        })
                    } else if (i > goalTextWordQueueValue) {
                        formattedGoalTextArr.push({
                            text: goalTextArr[i].text,
                            validation: 'none',
                        })
                    } else {
                        formattedGoalTextArr.push(
                            goalTextArr[i]
                        )
                    }
                }
            }

            dispatch(changeGoalTextDisplay(formattedGoalTextArr))
            console.log("formattedgoaltext", formattedGoalTextArr)
        }
    }, [userInputTextValue])

    // Game Time
    let interval = '';
    const timer = () => {
        interval = setInterval(function () {
            console.log("userTimeValue", userTimeValue)
            dispatch(changeUserTime());
        }, 1000);
    };

    useEffect(() => {
        if (userTimeValue <= 0) {
            clearInterval(interval);
            dispatch(changeGameStatus('reset'));
        }
    }, [userTimeValue, dispatch]);

    return (
        <>
            <InputGroup>
                <FormControl
                    placeholder="Counter Starts When First Character is Typed"
                    value={userInputTextValue}
                    onChange={(e) => handleUserInputText(e.target.value)}
                />
                <InputGroup.Text id="basic-addon1">{userTimeValue}</InputGroup.Text>
                <Button variant="outline-secondary">Reset the Game</Button>
            </InputGroup>
        </>
    )
}

export default UseActionArea