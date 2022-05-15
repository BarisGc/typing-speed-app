import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { goalText, userInputText, goalTextWordQueue, goalTextLineQueue, goalTextWordQueueValue } from '../../redux/typingSpeedTextSlice';

function GoalTextArea() {
  // Selectors & States
  const dispatch = useDispatch();
  const goalTextArr = useSelector(goalText);
  const userInputTextValue = useSelector(userInputText);
  const goalTextLineQueueValue = useSelector(goalTextLineQueue);
  const goalTextWordQueueValue = useSelector(goalTextWordQueue);

  console.log("goalTextLineQueueValue", goalTextLineQueueValue)
  console.log("goalTextWordQueueValue", goalTextWordQueueValue)

  // "textValidationDefiner" function
  const textValidationDefiner = (element) => {
    if (element) return element.validation == 'true' ? 'bg-success text-light' : element.validation == 'false' ? 'bg-danger text-light' : element.validation == 'checking' ? 'bg-secondary text-white' : 'bg-white text-dark'
    else return ''
  }

  // Display two goalText lines once
  let displayedGoalTextLinesArrayForMdandLgScreens = [];

  if (goalTextArr) {
    for (let i = 0; i < goalTextArr.length; i++) {
      displayedGoalTextLinesArrayForMdandLgScreens.push(
        <Col key={i} className={
          `text-center p-2 ${textValidationDefiner(goalTextArr[i])} ${goalTextArr[goalTextWordQueueValue - 1].validation == 'checking' ? 'checking' : ''}
          `
        }>
          {goalTextArr[i].text}
        </Col>
      );
    }
  }





  console.log("displayedGoalTextLinesArrayForMdandLgScreens", displayedGoalTextLinesArrayForMdandLgScreens)
  return (
    <>
      <Row xs={2} md={6} className=''>
        {displayedGoalTextLinesArrayForMdandLgScreens.map((element, index) => {
          if (index >= ((goalTextLineQueueValue - 1) * 12) && index < (goalTextLineQueueValue * 12)) {
            return element
          }
        })}
      </Row>

      <Row xs={2} md={6} className=''>
        {displayedGoalTextLinesArrayForMdandLgScreens.map((element, index) => {
          if (index >= ((goalTextLineQueueValue) * 12) && index < ((goalTextLineQueueValue + 1) * 12)) {
            return element
          }
        })}
      </Row>
    </>

  )
}

export default GoalTextArea