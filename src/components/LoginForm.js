import React from 'react'
import { Form, Button, Image } from 'semantic-ui-react'
import '../css/LoginForm.css'


class LoginForm extends React.Component{

  state = {
    email: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(response => {
			if (response.errors) {
				alert(response.errors)
			} else {
				// response is the user object
				// console.log(response)
				localStorage.setItem("token", response.token)
				this.props.setCurrentUser(response.user)
				this.props.history.push(`/users/${response.user.id}`)
			}
		})
	}

  render(){
    return(
      <div>
        <div className="login-logo">
					<Image src="https://github.com/aajennoh/brewery-frontend/blob/master/public/BU%20RP.png?raw=true" />
				</div>
				<div className="login-form">

          <Form className="form" onSubmit={this.handleSubmit}>
          <h1>Login Form</h1>
            <Form.Field>
              <label>Email</label>
              <input
                onChange={this.handleChange}
                value={this.state.email} 
                placeholder='Email' 
                name='email' 
              />
            </Form.Field>

            <Form.Field>
              <label>Password</label>
              <input 
                onChange={this.handleChange} 
                value={this.state.password} 
                name="password" 
                type="password" 
                placeholder='Password' 
              />
            </Form.Field>

            <Button type='submit'>Submit</Button>

          </Form>
        </div>
      </div>

      )
  }
}

export default LoginForm
