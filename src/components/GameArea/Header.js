import React from 'react'
import { Badge, Col } from 'react-bootstrap'
function Header() {
    return (
        <Col md={{ span: 12, offset: 0 }} className='d-flex justify-content-center bg-dark text-white py-3 mb-0 mb-md-4'>
            <h1 className='text-center'>
                Typing Speed Checker <Badge bg="danger">Random Places Of Turkey</Badge>
            </h1>
        </Col>
    )
}

export default Header