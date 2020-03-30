import React, { Component } from 'react'
import Header from '../Header'
import MainPage from '../MainPage'
import TeamModal from '../TeamModal'
import Errors from '../Errors'
import Loading from '../Loading'
import { getData } from '../../utilities/apiCalls'

import './App.css'

export default class App extends Component {
	state = { 
		data: [],
		errors: [],
		modalProps: false,
	}

    componentDidMount = async () => {
        const data = await getData()
        const errors = data.filter(resp => resp.error)
        
        errors.length
        ? this.setState({ errors })
        : this.setState({ data })
        
        this.targetElement = document.querySelector('.MainPage')
    }

    refreshData = () => this.componentDidMount()

	showModal = modalProps => this.setState({ modalProps })

	get showLoading() {
        return !this.state.data.length
    }

    get showErrors() {
        return this.state.errors.length
	}

	render = () => {
		const { data, errors, modalProps } = this.state

		return <div className='App'>
			<Header />

			{this.showErrors ? <Errors {...{ errors }} />
				
				: this.showLoading ? <Loading />
					
					: <MainPage 
						{...{
							data,
							refreshData: this.refreshData,
							showModal: this.showModal
						}}
					/>
	
			}

			{modalProps
				&& <TeamModal
					{...{
						team: modalProps,
						refreshData: this.refreshData,
						showModal: this.showModal,
					}}
				/>
			}
		</div>
	}
}
