import React from 'react';
import './BuildControls.css'

import BuildControl from './BuildControl/BuildControl'

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'},
];

const BuildControls = props => (
	<div className='BuildControls'>
		<p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
		 {controls.map(ctrl => (
			 <BuildControl 
			 	key={ctrl.label} 
			 	label={ctrl.label} 
			 	type={ctrl.type} 
			 	add={() => props.add(ctrl.type)}
			 	remove={() => props.remove(ctrl.type)}
			 	disabled={props.disabled[ctrl.type]}
			 />
		))}
		<button
			disabled={!props.purchasable} 
			className='OrderButton'
			onClick={props.ordered}>
			{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
		</button>
	</div>
)

export default BuildControls;
	
