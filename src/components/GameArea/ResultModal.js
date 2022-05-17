import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeUserInputText, resetGoalText, changeGoalTextWordQueue, changeGoalTextLineQueue, changeGameStatus, changeUserTime, randomArrayMaker } from '../../redux/typingSpeedTextSlice'
import { Modal, Button, ListGroup } from 'react-bootstrap'
function ResultModal() {
  var numeral = require('numeral');

  const [smShow, setSmShow] = useState(false);
  const dispatch = useDispatch();
  const gameStatusValue = useSelector((state) => state.typingSpeedText.gameStatus);
  const goalTextArr = useSelector((state) => state.typingSpeedText.goalText);

  useEffect(() => {
    if (gameStatusValue == 'finished') setSmShow(true)
  }, [gameStatusValue])

  const handleResetModalButton = () => {
    dispatch(changeGameStatus('reset'));
    dispatch(changeUserTime(30));
    dispatch(resetGoalText(randomArrayMaker()))
    dispatch(changeUserInputText(''))
    dispatch(changeGoalTextWordQueue(1))
    dispatch(changeGoalTextLineQueue(1))
    setSmShow(false)
  }

  const dksCalculator = () => {

    let enteredWords = []
    goalTextArr.forEach((element) => {
      return element.forEach((subElement) => {
        if (subElement.validation == 'false' || subElement.validation == 'true') enteredWords.push(subElement)
      })
    })
    return enteredWords.length
  }
  const wrongWordEntryCalculator = () => {
    let wrongEnteredWords = [];
    goalTextArr.forEach((element) => {
      return element.forEach((subElement) => {
        if (subElement.validation == 'false') wrongEnteredWords.push(subElement)
      })
    })
    return wrongEnteredWords.length
  }

  const trueWordEntryCalculator = () => {
    let trueEnteredWords = [];
    goalTextArr.forEach((element) => {
      return element.forEach((subElement) => {
        if (subElement.validation == 'true') trueEnteredWords.push(subElement)
      })
    })
    return trueEnteredWords.length
  }

  const successPercentageCalculator = () => {
    let result = (trueWordEntryCalculator() / (trueWordEntryCalculator() + wrongWordEntryCalculator()))
    return result
  }

  return (
    <Modal
      size="sm"
      show={smShow}
      backdrop="static"
      keyboard={false}
      onHide={() => setSmShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header >
        <Modal.Title id="example-modal-sizes-title-sm">
          Result
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item className='justify-content-between align-items-center d-flex'><span>TotalWord / Minute:</span><span className='text-warning boldValues fs-4 me-3'>{dksCalculator() * 2}</span></ListGroup.Item>
          <ListGroup.Item className='justify-content-between align-items-center d-flex'><span>Success Rate:</span><span className='text-success boldValues fs-4 me-3'>{numeral(successPercentageCalculator()).format('0.0%')}</span></ListGroup.Item>
          <ListGroup.Item className='justify-content-between align-items-center d-flex'><span>True Entries:</span><span className='text-success boldValues fs-4 me-3'>{trueWordEntryCalculator()}</span></ListGroup.Item>
          <ListGroup.Item className='justify-content-between align-items-center d-flex'><span>Wrong Entries:</span><span className='text-danger boldValues fs-4 me-3'>{wrongWordEntryCalculator()}</span></ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer><Button variant="secondary" onClick={() => handleResetModalButton()}>Reset the Game</Button></Modal.Footer>
    </Modal>
  )
}

export default ResultModal