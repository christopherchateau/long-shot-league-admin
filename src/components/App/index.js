import React, { useContext } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { DisplayContext } from '../../contexts/DisplayContext'
import Header from '../Header'
import MainPage from '../MainPage'
import TeamModal from '../TeamModal'
import Loading from '../Loading'
import Errors from '../Errors'

import './App.css'

const App = () => {
	const { loading, showErrors } = useContext(DataContext)
	const { modalProps } = useContext(DisplayContext)

	return (
		<div className='App'>
			<Header />

			{loading ? <Loading /> : showErrors ? <Errors /> : <MainPage />}

			{modalProps && <TeamModal />}
		</div>
	)
}

export default App
