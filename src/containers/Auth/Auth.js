import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions'
import './Auth.css'

const Auth = props => {

	const [ controls, updateControls ] = useState({
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Email Address'
			},
			value: '',
			validation: {
				required: true,
				isEmail: true
			},
			valid: false,
			touched: false
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Password'
			},
			value: '',
			validation: {
				required: true,
				minLength: 6
			},
			valid: false,
			touched: false
		},	
	})

	const [ isSignUp, setIsSignUp ] = useState(true)

	useEffect(() => {
		if (!props.buildingBurger && props.authRedirectPath !== '/') {
			props.onSetAuthRedirectPath();
		}	
	}, [props.buildingBurger, props.authRedirectPath])

	const checkValidity = (value, rules) => {
		let isValid = true;
		
		if ( !rules ) {
            return true;
        }
		
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

	const inputChangedHandler = (event, controlName) => {
		const eventValue = event.target.value;
	    updateControls(prevState => {

			const updatedFormElement = {
				...prevState[controlName]
			}
			
			updatedFormElement.value = eventValue;
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedFormElement.touched = true;
			
			return { ...prevState, [controlName]: updatedFormElement}
        });
	}

	const sumbitHandler = (event) => {
		event.preventDefault();
		props.onAuth(controls.email.value, controls.password.value, isSignUp)
	}

	const switchAuthModeHandler = () => {
		setIsSignUp(prevState => {
			return !prevState
		})
	}



	const formElementsArray = [];
	for (let key in controls) {
		formElementsArray.push({
			id: key,
			config: controls[key]
		})
	}

	let form = formElementsArray.map(formElement => (
		<Input 
			key={formElement.id}
			elementType={formElement.config.elementType} 
			elementConfig={formElement.config.elementConfig} 
			value={formElement.config.value}
			invalid={!formElement.config.valid}
			shouldValidate={formElement.config.validation}
			touched={formElement.config.touched}
			changed={(event) => inputChangedHandler(event, formElement.id)}
		/>
	))

	if (props.loading) {
		form = <Spinner />
	}

	let errorMessage = null;

	if (props.error) {
		errorMessage = (
			<p>{props.error.message.replace(/_/g, ' ')}</p>
		)
	}

	let authRedirect = null;
	
	if (props.isAuthenticated) {
		authRedirect = <Redirect to={props.authRedirectPath} />
	}
	
	return (
		<div className='Auth'>
			{authRedirect}
			{errorMessage}
			<form onSubmit={sumbitHandler}>
				{form}
				<Button btnType='Success'>SUBMIT</Button>
			</form>
			<Button 
				btnType='Danger' 
				clicked={switchAuthModeHandler}>
				SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}
			</Button>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath

	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
	