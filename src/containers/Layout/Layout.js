import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import './Layout.css'

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}

	sideDrawerToggleHandler = () => {
		this.setState(currentState => {
			return {showSideDrawer: !currentState.showSideDrawer}
		})
	}

	render() {
		return (
			<>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
				<SideDrawer 
					opened={this.state.showSideDrawer} 
					close={this.sideDrawerClosedHandler}
				/>
				<main className='Content'>
					{this.props.children}
				</main>
			</>
		)
	}	
};

export default Layout;