import React, {useState} from 'react'
import { Button, Col, Row, Spinner, Form, FormGroup, Label, Input, } from "reactstrap"
import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth'
import { useHistory } from "react-router-dom"


const AddFriend = ({setData}) => {
    const history = useHistory()
    let isLoading = false;
    const [friend, setFriend] = useState({
        name: '',
        age: '',
        email: ''
    })

    const onSubmit = (e) => {
        e.preventDefault()
        isLoading = true

        axiosWithAuth()
            .post('friends', friend)
            .then(res => {
                console.log('[LOG] Axios response (AddFriend): ', res.data.payload)
				setData(res.data);
                history.goBack()
                isLoading = false
            })
            .catch(err => {
                console.log("[LOG] Axios Error (AddFriend): ", err)
                isLoading = false
            }, [])
        
    }

    const handleChange = (e) => {
        setFriend({
            ...friend,
            [e.target.name]: e.target.value
        })
    }

    if (isLoading) {
        return (
            <Spinner color="primary" style={{ width: '48px', height: '48px' }} />
        )
    }

    return (
        <Row>
            <Col></Col>
            <Col>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Name:</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={friend.name}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="age">Age:</Label>
                        <Input
                            type="number"
                            name="age"
                            id="age"
                            value={friend.age}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={friend.email}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button color="primary">Submit</Button>
                    <Button color="warning" onClick={() => history.goBack()}>Cancel</Button>
                </Form>
            </Col>
            <Col></Col>
        </Row>
    )
}

export default AddFriend