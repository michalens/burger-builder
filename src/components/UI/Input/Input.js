import React from 'react';
import './Input.css'

const Input = props => {
	let inputElement = null;

	switch (props.elementType) {
		case('input'):
			elementType = <input className='InputElement' {...props.elementConfig} value={props.value}/>;
			break;
		case('textarea'):
			elementType = <textarea className='InputElement' {...props.elementConfig} `value={props.value}>;		
			break;
		default:
			elementType = <input className='InputElement' {...props.elementConfig} value={props.value}/>;
	}

	return (
		<div className='Input'>
			<label className='Label'>{props.label}</label>
			{inputElement}
		</div>
	)
}

export default Input;
	