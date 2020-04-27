import React, { useState, useEffect } from "react";
import { Route, Link, useHistory } from 'react-router-dom'
import PrivateRoute from '../privateRoute/PrivateRoute'
import { axiosWithAuth } from "../axiosWithAuth/axiosWithAuth";
import { Button, Card, Col, Row, Spinner, CardTitle, CardText } from "reactstrap";
import AddFriend from './AddFriend'


const Friends = (props) => {

    const [data, setData] = useState([]);
    
    let history = useHistory()

    let isLoading = false;

    useEffect(() => {
        isLoading = true
        
		setTimeout(() => {
			isLoading = false
        }, 3000)
        
		axiosWithAuth()
			.get("friends")
			.then(res => {
				console.log('[LOG] Axios response (Friends): ', res.data)
				setData(res.data);
                isLoading = false
			})
			.catch(err => {
				console.log("[LOG] Axios Error (Friends): ", err)
                isLoading = false
			});
    }, [])

    if (isLoading) {
        return (
            <Spinner color="primary" style={{ width: '48px', height: '48px' }} />
        )
    }
    
    return (
        <section>
			<Row>
				{data.map(friend => (
					<Col md="4" key={Number(friend.id) + Date.now()} className="friend-card-col">
						<Card key={friend.id} className="friend-card" body>
							<CardTitle>{friend.name}</CardTitle>
							<CardText>Age: {friend.age}</CardText>
							<Button color="success">{friend.email}</Button>
						</Card>
					</Col>
				))}
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <PrivateRoute exact path="/friends/add-new" component={() => <AddFriend setData={setData} />} />
                    <Link to="/friends/add-new">Add New Friend</Link>
                </Col>
                <Col></Col>
            </Row>
		</section>
    )
}

export default Friends