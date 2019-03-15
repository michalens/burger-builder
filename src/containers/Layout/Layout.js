import React, { Component } from 'react';
import { connect } from 'react-redux'

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
				<Toolbar 
					isAuth={this.props.isAuthenticated}
					drawerToggleClicked={this.sideDrawerToggleHandler}/>
				<SideDrawer 
					isAuth={this.props.isAuthenticated}
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

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout);