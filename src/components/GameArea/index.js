import React from 'react'
import { Col, FloatingLabel, Form } from 'react-bootstrap'

import GoalTextArea from './GoalTextArea'
import UseActionArea from './UseActionArea'
import ResultModal from './ResultModal'

function index() {
    return (
        <>
            <Col md={{ span: 10, offset: 1 }} className='mt-5 bg-light '>
                <GoalTextArea />
            </Col>

            <Col md={{ span: 8, offset: 2 }} className='mt-5 p-0'>
                <UseActionArea />
            </Col>

            <ResultModal />



        </>
    )
}

export default index