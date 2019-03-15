import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const NavigationItems = props => (
	<ul className ={'NavigationItems'}>
		<NavigationItem link="/" exact>Burger Builder</NavigationItem>
		<NavigationItem link="/orders">Orders</NavigationItem>
		{!props.isAuth 
			? <NavigationItem link="/auth">Authenticate</NavigationItem>
			: <NavigationItem link="/logout">Logout</NavigationItem>}
	</ul>
)

export default NavigationItems;
	