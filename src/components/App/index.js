import React, { useState, useEffect } from 'react'
import Header from '../Header'
import MainPage from '../MainPage'
import TeamModal from '../TeamModal'
import Loading from '../Loading'
import { getData } from '../../utilities/apiCalls'

import './App.css'

const App = () => {
	const [data, setData] = useState(null)
	const [modalProps, setModalProps] = useState(null)

	useEffect(() => { loadData() }, [])

	const loadData = async () => setData( await getData())

	const showModal = modalProps => setModalProps(modalProps)

	return (
		<div className='App'>

			<Header />
			
			{!data
				? <Loading />
				: <MainPage {...{ data, showModal, loadData }} />
			}

			{modalProps && <TeamModal {...{ team: modalProps, showModal, loadData }} />}{' '}
		</div>
	)
}

export default App
