import React, {Component} from "react";
import {Card, Form, Button,Col} from 'react-bootstrap';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      message: "",
      messages: [],
      mounted: false,
      id : 0
    };
    this.submitInfo = this.submitInfo.bind(this);
    this.change = this.change.bind(this);
  }

  componentDidMount(){
    console.log("mounted")
    axios.get("http://localhost:8080/message", {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then( 
        (response) => { 
            console.log(response.data);
            var len = response.data.length;
            this.state.id = response.data[len-1].id+1;

            for (var i = 0; i<response.data.length; i++) {
                // this.state.messages+=("<div>" +response.data[i].message + "</div")
                this.state.messages.push(response.data[i].message)
            }
            console.log(this.state.messages)
            // for (var m in this.state.messages) {
            //     var newElement = document.createElement('div');
            //     newElement.id = this.state.messages[m]; newElement.className = "message";
            //     newElement.innerHTML = this.state.messages[m];
            //     document.body.appendChild(newElement);
            // } 
        }, 
        (error) => { 
            console.log(error); 
        } 
    ); 
  }
  
  submitInfo(event){
      console.log(this.state.id)
      const message = { 
        'message' : this.state.message,
        'id': this.state.id,
    };
      axios.post("http://localhost:8080/message/new", message, {
              headers: {
                  'Content-Type': 'application/json',
              }
          }
      ).then( 
          (response) => { 
              console.log(response.data);
          }, 
          (error) => { 
              console.log(error); 
          } 
      ); 
      this.state.id += 1;
      this.state.messages.push(message.message)
        // var newElement = document.createElement('div');
        // newElement.id = message.message; newElement.className = "message";
        // newElement.innerHTML = message.message;
        // document.body.appendChild(newElement);

      event.preventDefault();
  }

  change(event) {
      this.setState({
          [event.target.name]:event.target.value
      })
  }

  render() {
    var renderedOutput = this.state.messages.map(function(message){
        return <div> {message} </div>
    })
    return (
      <Card className={"border border-dark bg-dark text-white"}>
            <div>
                <h1 className="Header">Chat Box</h1>
            </div>
            <div>
                {renderedOutput}
            </div>
            <Form onSubmit={this.submitInfo} id="LoginForm">
                <Card.Body>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridMessage">
                            <Form.Label>message: </Form.Label>
                            <Form.Control required
                                type="text"
                                name="message"
                                value={this.state.message}
                                onChange={this.change}
                                placeholder="Enter message" />
                        </Form.Group>
                    </Form.Row>
                </Card.Body>
                <Card.Footer style={{"textAlign":"right"}}>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
        );
    }
}