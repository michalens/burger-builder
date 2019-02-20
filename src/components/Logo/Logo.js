import React from 'react';
import './Logo.css'
import burgerLogo from '../../assets/images/burger-logo.png'

const Logo = props => (
	<div className={'Logo'}>
		<img src={burgerLogo} alt='MyBurgerLogo' />
	</div>
)

export default Logo;
	