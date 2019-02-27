import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'
import './ContactData.css'

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: ''
			},
			email: {
				elementType: 'email',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Email'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'},
					]
				},
				value: ''
			},
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true})
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false})	
				this.props.history.push('/')
			})
			.catch(err => {
				this.setState({loading: false})	
			})
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const { value } = event.target;
		this.setState(prevState => ({
	      orderForm: {
	        ...prevState.orderForm,
	        [inputIdentifier]: {
	          ...prevState.orderForm[inputIdentifier],
	          value,
	        },
	      },
	    }));
		// this.setState(prevState => {
		// 	prevState[inputIdentifier].value = event.target.value;
		// 	return prevState;
		// });
	}
	
	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType} 
						elementConfig={formElement.config.elementConfig} 
						value={formElement.config.value}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}/> 
				))}
				<Button btnType='Success'>ORDER</Button>
			</form>
		);
		if (this.state.loading === true) {
			form = <Spinner />
		}
		return (
			<div className='ContactData'>
				<h4>Enter your contact data</h4>
				{form}	
			</div>
		)
	}
}

export default ContactData;
	