import './App.css';
import { Container, Row } from 'react-bootstrap'
import GameArea from './components/GameArea'

function App() {
  return (
    <Container fluid className='bg-dark'>
      <Row>
        <GameArea />
      </Row>
    </Container>
  );
}

export default App;
