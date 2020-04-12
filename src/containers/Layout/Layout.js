import React, { useState } from 'react';
import { connect } from 'react-redux'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import './Layout.css'

const Layout = props => {
	const [ showSideDrawer, setShowSideDrawer ] = useState(false)

	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false)
	}

	const sideDrawerToggleHandler = () => {
		setShowSideDrawer(prevState => !prevState)
	}

	return (
		<>
			<Toolbar 
				isAuth={props.isAuthenticated}
				drawerToggleClicked={sideDrawerToggleHandler}/>
			<SideDrawer 
				isAuth={props.isAuthenticated}
				opened={showSideDrawer} 
				close={sideDrawerClosedHandler}
			/>
			<main className='Content'>
				{props.children}
			</main>
		</>
	)
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout);