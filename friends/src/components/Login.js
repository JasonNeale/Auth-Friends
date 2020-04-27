import React, {useState} from 'react'
import { Button, Spinner, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'
import {axiosWithAuth} from '../axiosWithAuth/axiosWithAuth' 
import { useHistory } from "react-router-dom"


const Login = (props) => {
    const history = useHistory()
    let isLoading = false
    const [credentials, setCredentials] = useState({ username: "", password: "" })
    const handleChange = (e) => {setCredentials({ ...credentials, [e.target.name]: e.target.value })}

    localStorage.setItem('user', credentials.username)

    const onSubmit = (e) => {
        e.preventDefault()
        isLoading = true

        axiosWithAuth()
            .post('login', credentials)
            .then(res => {
                console.log('[LOG] Axios response: ', res.data.payload)
                localStorage.setItem('token', res.data.payload)
                setCredentials(credentials)
                history.push("/friends")
                isLoading = false
            })
            .catch(err => {
                localStorage.removeItem("token")
                console.log("[LOG] Axios Error: ", err)
                isLoading = false
            }, [])
    }

    if (isLoading) {
        return (
            <Spinner color="primary" style={{ width: '48px', height: '48px' }} />
        )
    }


    return (
        <Row>
            <Col md="4"></Col>
            <Col md="4">
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label htmlFor="username">Username:</Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Your username"
                            value={credentials.username}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password placeholder"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button color="primary">Login</Button>
                </Form>
            </Col>
            <Col md="4"></Col>
        </Row>
    )
}

export default Login