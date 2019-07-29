import React from 'react'
import { Grid, Menu, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

  render(){
    return (
			<Grid.Row >
				<Grid.Column width={16}>

					<Menu className="ui stackable blue inverted menu">
						<Image src="https://github.com/aajennoh/brewery-frontend/blob/master/public/BU%20RP%20(2).png?raw=true" />
						<Link className="item" to="/" onClick={() => this.props.fetchMostLiked()}>
							<Icon name="beer" />
						</Link>
						<Link className="item" to="/map" >
							<Icon name="map" />
						</Link>
						{
							this.props.currentUser 
							
							?

							<Menu.Menu position="right">
								<Link className="item" to={`/newbrewery`}>
									<Icon name="wpforms"/>
								</Link>
								<Link className="item" to={`/users/${this.props.currentUser.id}`}>
									<Icon name="heart"/>
								</Link>
								<Menu.Item onClick={this.props.logout}>
									<Icon name="log out"/>
								</Menu.Item>
							</Menu.Menu>
						
							:

							<Menu.Menu position="right">
								<Link className="item" to="/login">
									<Icon name="sign-in"/>
								</Link>
								<Link className="item" to="/signup">
									<Icon name="signup"/>
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