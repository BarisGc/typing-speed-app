import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap'

function GoalTextArea() {
  const goalTextArr = useSelector((state) => state.typingSpeedText.goalText);
  const goalTextLineQueueValue = useSelector((state) => state.typingSpeedText.goalTextLineQueue);
  const goalTextWordQueueValue = useSelector((state) => state.typingSpeedText.goalTextWordQueue);

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