import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap'

function GoalTextArea() {
  const goalTextArr = useSelector((state) => state.typingSpeedText.goalText);
  const goalTextLineQueueValue = useSelector((state) => state.typingSpeedText.goalTextLineQueue);

  // "textValidationDefiner" function
  const textValidationDefiner = (element) => {
    if (element) return element.validation == 'true' ? 'bg-success text-light' : element.validation == 'false' ? 'bg-danger text-light' : element.validation == 'checking' ? 'bg-secondary text-white' : 'bg-white text-dark'
    else return ''
  }

  // Display two goalText lines once
  let displayedGoalTextLine1Array = [];
  let displayedGoalTextLine2Array = [];
  if (goalTextLineQueueValue == 1 || goalTextLineQueueValue == 2) {
    if (goalTextArr) {
      for (let i = 0; i < 1; i++) {
        console.log("goaltextareagoalTextArr[i]1", goalTextArr[i])
        displayedGoalTextLine1Array.push(
          goalTextArr[i].map((element, index) => (
            <Col key={index} className={
              `text-center p-2 ${textValidationDefiner(element)} ${element.validation == 'checking' ? 'checking' : ''}
          `
            }>
              {element.text}
            </Col>
          ))
        );
      }
    }

    if (goalTextArr) {
      for (let i = 1; i < 2; i++) {
        console.log("goaltextareagoalTextArr[i]2", goalTextArr[i])
        displayedGoalTextLine2Array.push(
          goalTextArr[i].map((element, index) => (
            <Col key={index} className={
              `text-center p-2 ${textValidationDefiner(element)} ${element.validation == 'checking' ? 'checking' : ''}
          `
            }>
              {element.text}
            </Col>
          ))
        );
      }
    }
  } else {
    if (goalTextArr) {
      for (let i = goalTextLineQueueValue - 2; i < goalTextLineQueueValue - 1; i++) {
        console.log("goaltextareagoalTextArr[i]1", goalTextArr[i])
        displayedGoalTextLine1Array.push(
          goalTextArr[i].map((element, index) => (
            <Col key={index} className={
              `text-center p-2 ${textValidationDefiner(element)} ${element.validation == 'checking' ? 'checking' : ''}
          `
            }>
              {element.text}
            </Col>
          ))
        );
      }
    }

    if (goalTextArr) {
      for (let i = goalTextLineQueueValue - 1; i < goalTextLineQueueValue; i++) {
        console.log("goaltextareagoalTextArr[i]2", goalTextArr[i])
        displayedGoalTextLine2Array.push(
          goalTextArr[i].map((element, index) => (
            <Col key={index} className={
              `text-center p-2 ${textValidationDefiner(element)} ${element.validation == 'checking' ? 'checking' : ''}
          `
            }>
              {element.text}
            </Col>
          ))
        );
      }
    }
  }
  console.log("displayedGoalTextLine1Array", displayedGoalTextLine1Array)
  console.log("displayedGoalTextLine2Array", displayedGoalTextLine2Array)
  return (
    <>
      <Row xs={2} md={6} className=''>
        {displayedGoalTextLine1Array.map((element, index) => (element))}
      </Row>

      <Row xs={2} md={6} className=''>
        {displayedGoalTextLine2Array.map((element, index) => (element))}
      </Row>
    </>
  )
}

export default GoalTextArea