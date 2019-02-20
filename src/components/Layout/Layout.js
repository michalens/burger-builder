import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import './Layout.css'

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}

	sideDrawerOpenHandler = () => {
		this.setState({showSideDrawer: true})
	}

	render() {
		return (
			<>
				<Toolbar openSideDrawer={this.sideDrawerOpenHandler}/>
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