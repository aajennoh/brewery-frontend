import React, { Component } from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render(){
    console.log(this.props.currentUser)
    console.log(this.props)
    return (
			<Grid.Row>
				<Grid.Column width={16}>
					<Menu>
						<Link className="item" to="/">
							Home
						</Link>
						{
							this.props.currentUser 
							
							?

							<Menu.Menu position="right">
								{/* <Link className="item" to={`/users/${this.props.currentUser.id}`}>
									Profile
								</Link> */}
								<Menu.Item onClick={this.props.logout}>
									Log out
								</Menu.Item>
							</Menu.Menu>
						
							:

							<Menu.Menu position="right">
								<Link className="item" to="/login">
									Login
								</Link>
								<Link className="item" to="/signup">
									Sign Up
								</Link>
							</Menu.Menu>
							
						}
					</Menu>
				</Grid.Column>
			</Grid.Row>
		)
	}
}

export default Navbar