import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../../store/actions'

import './ContactData.css'

const ContactData = props => {

	const [ orderForm, updateOrderForm ] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Name'
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Street'
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'ZIP'
			},
			value: '',
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5
			},
			valid: false,
			touched: false
		},
		country: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Country'
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false
		},
		email: {
			elementType: 'email',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Email'
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{value: 'fastest', displayValue: 'Fastest'},
					{value: 'cheapest', displayValue: 'Cheapest'},
				]
			},
			value: 'fastest',
			validation: {},
			valid: true
		},	
	})

	const [ formIsValid, setFormIsValid ] = useState(false)

	useEffect(() => {
		let formIsValid = true;
		for (let inputIdentifier in orderForm) {
			formIsValid = orderForm[inputIdentifier].valid && formIsValid;
		}
		setFormIsValid(formIsValid)
	}, [orderForm])


	const orderHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in orderForm) {
			formData[formElementIdentifier] = orderForm[formElementIdentifier].value
		}
		const order = {
			ingredients: props.ings,
			price: props.price,
			orderData: formData,
			userId: props.userId
		}
		props.onOrderBurger(order, props.token)
	}


	const checkValidity = (value, rules) => {
		let isValid = true;
		
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		
		if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
		}
		
		return isValid
	}


	const inputChangedHandler = (event, inputIdentifier) => {
		const eventValue = event.target.value;
		updateOrderForm((prevState) => {
			const updatedFormElement = {
				...prevState[inputIdentifier]
			}
			updatedFormElement.value = eventValue;
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
			updatedFormElement.touched = true;
			
			return { ...prevState, [inputIdentifier]: updatedFormElement }
		})
	}
	
	const formElementsArray = [];
	for (let key in orderForm) {
		formElementsArray.push({
			id: key,
			config: orderForm[key]
		})
	}
	
	let form = (
		<form onSubmit={orderHandler}>
			{formElementsArray.map(formElement => (
				<Input
					key={formElement.id}
					elementType={formElement.config.elementType} 
					elementConfig={formElement.config.elementConfig} 
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					changed={(event) => inputChangedHandler(event, formElement.id)}/> 
			))}
			<Button btnType='Success' disabled={!formIsValid}>ORDER</Button>
		</form>
	);
	if (props.loading === true) {
		form = <Spinner />
	}
	return (
		<div className='ContactData'>
			<h4>Enter your contact data</h4>
			{form}	
		</div>
	)
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));
	