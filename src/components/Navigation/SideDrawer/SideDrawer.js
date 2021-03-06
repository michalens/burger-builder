import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import './SideDrawer.css'

const SideDrawer = props => {
	let attachedClasses = ['SideDrawer', 'Close']
	if (props.opened) {
		attachedClasses = ['SideDrawer', 'Open']
	}
	return(
		<>
			<Backdrop show={props.opened} clicked={props.close} />
			<div className={attachedClasses.join(' ')} onclick={props.close}>
				<Logo height='11%'/>
				<nav>
					<NavigationItems isAuth={props.isAuth} />
				</nav>
			</div>
		</>
	)
}

export default SideDrawer;
	