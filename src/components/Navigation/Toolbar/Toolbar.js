import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './Toolbar.css'

const Toolbar = props => (
	<header className={'Toolbar'}>
		<button onClick={props.openSideDrawer}>MENU</button>
		<Logo height='80%'/>
		<nav className={'DesktopOnly'}>
			<NavigationItems />
		</nav>
	</header>
)

export default Toolbar;
	