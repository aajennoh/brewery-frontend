import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class SignupForm extends React.Component {
	state = {
		name: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	createUser = () => {
		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then((response) => {
			if (response.errors){
				alert(response.errors)
			} else {
				localStorage.setItem("token", response.token)
				this.props.setCurrentUser(response.user)
				this.props.history.push(`/users/${response.user.id}`)
			}
		})
	}

	handleSubmit = () => {
		if(this.state.password === this.state.passwordConfirmation){
			this.createUser()
		} else {
			alert("Please enter the same password")
		}
	}

	render(){
		return (
			<div>
					<h1>Signup Form</h1>
					<Form className="form" onSubmit={this.handleSubmit}>
						<Form.Field>
							<label>Name</label>
							<input 
								onChange={this.handleChange} 
								name="name" 
								value={this.state.name} 
								placeholder='Name' 
							/>
						</Form.Field>

						<Form.Field>
							<label>Email</label>
							<input 
								onChange={this.handleChange} 
								name="email" 
								value={this.state.email} 
								placeholder='Email' 
							/>
						</Form.Field>

						<Form.Field>
							<label>Password</label>
							<input 
								onChange={this.handleChange} 
								type="password" 
								name="password" 
								value={this.state.password} 
								placeholder='Password' 
							/>
						</Form.Field>

						<Form.Field>
							<label>Password Confirmation</label>
							<input 
								onChange={this.handleChange}
								type="password" 
								name="passwordConfirmation" 
								value={this.state.passwordConfirmation} 
								placeholder='Password Confirmation' 
							/>
						</Form.Field>

						<Button type='submit'>Submit</Button>

					</Form>
			</div>
		)
	}
}

export default SignupForm
