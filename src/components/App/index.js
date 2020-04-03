import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../contexts/DataContext'
import Header from '../Header'
import MainPage from '../MainPage'
import TeamModal from '../TeamModal'
import Loading from '../Loading'
import Errors from '../Errors'

import './App.css'

const App = () => {
	const { data } = useContext(DataContext)

	const [errors, setErrors] = useState([])
	const [modalProps, setModalProps] = useState(null)

	useEffect(() => {
		if (data) setErrors(data.filter(resp => resp.error))
	}, [data])

	const showModal = modalProps => setModalProps(modalProps)

	return (
		<div className='App'>

			<Header />

			{!data ? <Loading />

				: errors.length ? <Errors {...{ errors }} />
					
					: <MainPage {...{ showModal }} />
			}

			{modalProps &&
				<TeamModal {...{ team: modalProps, showModal }} />
			}

		</div>
	)
}

export default App
