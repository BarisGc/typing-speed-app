import Header from './Header'
import GoalTextArea from './GoalTextArea'
import UseActionArea from './UseActionArea'
import ResultModal from './ResultModal'
import { Col } from 'react-bootstrap'

function index() {
    return (
        <>
            <Col md={{ span: 10, offset: 1 }} className='mt-2  '>
                <Header />
            </Col>
            <Col md={{ span: 10, offset: 1 }} className='mt-0 bg-light '>
                <GoalTextArea />
            </Col>

            <Col md={{ span: 8, offset: 2 }} className='mt-4 p-0'>
                <UseActionArea />
            </Col>

            <ResultModal />
        </>
    )
}

export default index