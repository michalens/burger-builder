import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

// import axios from 'axios'


class Checkout extends Component {
	state = {
		ingredients: {}
	}

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		for (let params of query.entries()) {
			ingredients[params[0]] = +params[1]
		}
		this.setState({ingredients:ingredients})
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack()
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data')	
	}

	render() {
		return(
			<div>
				<CheckoutSummary 
					ingredients={this.state.ingredients} 
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
			</div>
		)
	}
}

export default Checkout;
