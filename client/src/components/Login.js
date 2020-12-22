import React, {Component} from "react";
import {Card, Form, Button,Col} from 'react-bootstrap';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.submitInfo = this.submitInfo.bind(this);
    this.change = this.change.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  submitInfo(event){
      console.log(' username: '+this.state.username+' password: '+this.state.password);
      const userInputs = { 
          'username' : this.state.username,
          'password': this.state.password,
      };

      axios.post("http://localhost:8080/login", userInputs, {
              headers: {
                  'Content-Type': 'application/json',
              }
          }
      ).then( 
          (response) => { 
              console.log(response.data);
              if(response.data == true){
                alert("Logged In");

              }else{
                alert("Wrong Username or Password");
              }
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
                <h1 className="Header">Login Page</h1>
              </div>
              <Form onSubmit={this.submitInfo} id="LoginForm">
                  <Card.Body>
                      <Form.Row>
                          <Form.Group as={Col} controlId="formGridUsername">
                              <Form.Label>Username:  </Form.Label>
                              <Form.Control required
                                  type="text"
                                  name="username"
                                  value={this.state.username}
                                  onChange={this.change}
                                  className={"bg-dark  text-white"}
                                  placeholder="Enter Username" />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridPassword">
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