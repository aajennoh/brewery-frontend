import React from 'react'
import { Grid, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render(){
    return (
			<Grid.Row>
				<Grid.Column width={16}>
					<Menu>
						<Link className="item" to="/" onClick={() => this.props.fetchMostLiked()}>
							<Icon name="beer" />
						</Link>
						{
							this.props.currentUser 
							
							?

							<Menu.Menu position="right">
								<Link className="item" to={`/newbrewery`}>
									New Brewery
								</Link>
								<Link className="item" to={`/users/${this.props.currentUser.id}`}>
									Favorites
								</Link>
								<Menu.Item onClick={this.props.logout}>
									Log Out
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