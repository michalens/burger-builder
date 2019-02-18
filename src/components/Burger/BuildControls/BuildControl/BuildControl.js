import React from 'react';
import './BuildControl.css'

const BuildControl = props => (
	<div className='BuildControl'>
		<div className='Label'>{props.label}</div>
		<button onClick={props.remove} className='Less'>Less</button>
		<button onClick={props.add} className='More' >More</button>
	</div>
)

export default BuildControl;
	