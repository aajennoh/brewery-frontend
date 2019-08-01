import React from 'react'
import { Grid, Menu, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../css/NavBar.css'
import ReactTooltip from 'react-tooltip'

class Navbar extends React.Component {

	handleClick = () => {
		fetch('http://localhost:3000/breweries/find_brewery', {
			method: 'POST',
			headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
			},
			body: JSON.stringify({
				currentLatitude: this.props.currentLatitude,
				currentLongitude: this.props.currentLongitude
			})
		}).then(response => response.json())
		.then(this.props.setBreweriesNearMe)
	}

  render(){
    return (
			<Grid.Row >
				<Grid.Column width={16}>

					<Menu className="ui stackable yellow inverted menu">

						<Link className="item" to="/" onClick={() => this.props.fetchMostLiked()}>
						<Image size="mini" src="https://github.com/aajennoh/brewery-frontend/blob/master/public/BU%20RP%20(1).png?raw=true" />
						</Link>
						<Link className="item" to="/map" >
							<Icon name="map" />
						</Link>
						{
							this.props.currentUser
							
							?

							<Menu.Menu position="right">
								<Link data-tip="Breweries Near Me" className="item" onClick={this.handleClick} to={`/find_brewery`} >
								<ReactTooltip place="top" type="warning" effect="float"/>
									<Icon name="location arrow"/>
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