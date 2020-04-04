import React, { useContext } from 'react'
import { DataContext } from '../../contexts/DataContext'
import Header from '../Header'
import MainPage from '../MainPage'
import TeamModal from '../TeamModal'
import Loading from '../Loading'
import Errors from '../Errors'

import './App.css'

const App = () => {
	const { data, modalProps } = useContext(DataContext)

	return (
		<div className='App'>

			<Header />

			{!data

				? <Loading />
				: data.errors.length

					? <Errors errors={data.errors} />
					: <MainPage />

			}

			{modalProps && <TeamModal />}

		</div>
	)
}

export default App
