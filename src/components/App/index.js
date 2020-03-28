import React, { Component } from 'react'
import Header from '../Header'
import MainPage from '../MainPage'

import './App.css'

export default class App extends Component {
	render = () =>
		<div className='App'>
			<Header />
			<MainPage />
		</div>
}
