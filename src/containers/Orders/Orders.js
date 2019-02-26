import React, { Component } from 'react';
import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
// import './Orders.css'

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	}
	componentWillMount() {
		axios.get('/orders.json')
			.then (res => {
				const fetchedData = [];
				for (let key in res.data) {
					fetchedData.push({
						...res.data[key],
						id: key
					})
				}
				this.setState({loading: false, orders: fetchedData});
			})
			.catch (err => {
				this.setState({loading: false});
			})
	}

	render() {
		let orders = <Spinner />;
		if (!this.state.loading) {
			orders = this.state.orders.map(order => (
					<Order 
						key={order.id}
						ingredients={order.ingredients}
						price={+order.price}
					/>
				))
		}
		return (
			<div>
				{orders}
			</div>
		)
	}
}

export default withErrorHandler(Orders, axios);
	