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
	</div>
)

export default BuildControls;
	
