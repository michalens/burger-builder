import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const NavigationItems = props => (
	<ul className ={'NavigationItems'}>
		<NavigationItem link="/" exact>Burger Builder</NavigationItem>
		{props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
		{!props.isAuth 
			? <NavigationItem link="/auth">Authenticate</NavigationItem>
			: <NavigationItem link="/logout">Logout</NavigationItem>}
	</ul>
)

export default NavigationItems;
	