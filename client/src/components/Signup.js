import React, {Component} from "react";
import {Card, Form, Button} from 'react-bootstrap';
import axios from 'axios';

export default class Signup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        email: ""
      };
      this.submitInfo = this.submitInfo.bind(this);
      this.change = this.change.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    submitInfo(event){
        console.log('email: '+this.state.email+' username: '+this.state.username+' password: '+this.state.password);
        const userInputs = { 
            'email': this.state.email,
            'username' : this.state.username,
            'password': this.state.password,
        };

        axios.post("http://localhost:8080/signup", userInputs, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then( 
            (response) => { 
                console.log(response);
                
            }, 
            (error) => { 
                console.log(error); 
            } 
        ); 

        event.preventDefault();
    }

    change(event) {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
        return (
            <div class="container h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-10 col-md-8 col-lg-6"></div>
                            <div>
                                <h1 className="Header">Sign Up Page</h1>
                            </div>
                            <Form onSubmit={this.submitInfo} id="SignUpForm">
                                <Card.Body>
                                    <Form.Row>
                                        <Form.Group controlId="formGridEmail">
                                            <Form.Label>Email address: </Form.Label>
                                            <Form.Control required
                                                type="email"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.change}
                                                className={"bg-dark  text-white"}
                                                placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group controlId="formGridUsername">
                                            <Form.Label>Username: </Form.Label>
                                            <Form.Control required
                                                type="text"
                                                name="username"
                                                value={this.state.username}
                                                onChange={this.change}
                                                className={"bg-dark  text-white"}
                                                placeholder="Enter Username" />
                                        </Form.Group>
                                        <Form.Group controlId="formGridPassword">
                                            <Form.Label>Password: </Form.Label>
                                            <Form.Control required
                                                type="text"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.change}
                                                className={"bg-dark  text-white"}
                                                placeholder="Enter Password" />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button variant="primary" type="submit" >
                                        Submit
                                    </Button>
                                </Card.Body>
                            </Form>
                    </div>
                </div>
        );
    }
  }
