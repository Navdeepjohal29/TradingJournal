import React, { useCallback } from 'react';
import './Dashboard.scss'
import { Col, Container, Row } from 'react-bootstrap';
import TradingCalendar from '../TradingCalendar/TradingCalendar';

const Dashboard = ({trades}) => {

    return (
        <Container>
            <Row>
                <Col className='col-md-12'>
                <TradingCalendar/>
                </Col>
            </Row>
        </Container>

    )
}

export default Dashboard;