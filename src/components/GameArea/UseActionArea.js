import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeUserInputText, changeGoalTextDisplay, changeGoalTextWordQueue, changeGoalTextLineQueue, changeGameStatus, changeUserTime, randomArrayMaker } from '../../redux/typingSpeedTextSlice'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

function UseActionArea() {
    const dispatch = useDispatch();
    const goalTextArr = useSelector((state) => state.typingSpeedText.goalText);
    const userInputTextValue = useSelector((state) => state.typingSpeedText.userInputText);
    const userTimeValue = useSelector((state) => state.typingSpeedText.userTime);
    const gameStatusValue = useSelector((state) => state.typingSpeedText.gameStatus);
    const goalTextWordQueueValue = useSelector((state) => state.typingSpeedText.goalTextWordQueue);
    const goalTextLineQueueValue = useSelector((state) => state.typingSpeedText.goalTextLineQueue);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        let formattedGoalTextArr = []
        if (userInputTextValue) {
            if (userInputTextValue[userInputTextValue.length - 1] == ' ') {
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
            // console.log("formattedgoaltext", formattedGoalTextArr)
        }
    }, [userInputTextValue])

    const handleUserInputText = (event) => {
        dispatch(changeUserInputText(event.target.value))
        if (gameStatusValue == 'reset') {
            dispatch(changeGameStatus('playing'));
            setTimeLeft(30)
            console.log("handle girdi mi?")
        }
    }

    // Game Time
    useEffect(() => {
        if (gameStatusValue == 'playing') {
            if (timeLeft === 0) {
                console.log("TIME LEFT IS 0");
                dispatch(changeGameStatus('finished'));
                setTimeLeft(null)
            }

            // exit early when we reach 0
            if (!timeLeft) return;

            // save intervalId to clear the interval when the
            // component re-renders
            const intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
                dispatch(changeUserTime(timeLeft - 1));
            }, 1000);

            // clear interval on re-render to avoid memory leaks
            return () => clearInterval(intervalId);
            // add timeLeft as a dependency to re-rerun the effect
            // when we update it
        }
    }, [dispatch, gameStatusValue, timeLeft]);

    const handleResetButton = () => {
        dispatch(changeGameStatus('reset'));
        dispatch(changeUserTime(30));
        dispatch(changeGoalTextDisplay(randomArrayMaker()))
        dispatch(changeUserInputText(''))
        dispatch(changeGoalTextWordQueue(1))
        dispatch(changeGoalTextLineQueue(1))
    }

    return (
        <>
            <InputGroup>
                <FormControl
                    autoFocus
                    placeholder="Press Space to Check the Word"
                    value={userInputTextValue}
                    onChange={(event) => handleUserInputText(event)}
                />
                <InputGroup.Text className={
                    `${userTimeValue < 10 ? 'bg-warning' : 'bg-primary'} text-white border-0`
                } id="basic-addon1">{String(userTimeValue).padStart(2, 0)}{` sec`}</InputGroup.Text>
                <Button variant="secondary" onClick={() => handleResetButton()}>Reset the Game</Button>
            </InputGroup>
        </>
    )
}

export default UseActionArea