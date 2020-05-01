import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Container, Row, Col } from "reactstrap";
import './App.css';
import Login from './components/Login'
import Friends from './components/Friends'
import PrivateRoute from './privateRoute/PrivateRoute'
import Home from './components/Home'
import Nav from './components/Nav'

function App(props) {

    return (
        <Container className="App">
            <Nav />

            <Row className="page-body">
                <Col md="12">
                    <Switch>
                        <PrivateRoute path="/friends" component={Friends} />
                        
                        <Route exact path="/" component={Home}>
                            {localStorage.clear()}
                        </Route>
                        <Route path="/login" props={props} component={Login} />

                        <Route path="/logout">
                            {localStorage.removeItem('token')}
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
}

export default App;