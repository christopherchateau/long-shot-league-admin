import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../contexts/DataContext'
import Header from '../Header'
import MainPage from '../MainPage'
import TeamModal from '../TeamModal'
import Loading from '../Loading'
import Errors from '../Errors'

import './App.css'

const App = () => {
	const { data, modalProps } = useContext(DataContext)

	const [errors, setErrors] = useState([])

	useEffect(() => {
		if (data) setErrors(data.filter(resp => resp.error))
	}, [data])

	return (
		<div className='App'>

			<Header />

			{!data ? <Loading />

				: errors.length ? <Errors {...{ errors }} />
					
					: <MainPage />
			}

			{modalProps && <TeamModal />}

		</div>
	)
}

export default App
