import React, { useState, useEffect } from 'react'
import Errors from '../Errors'
import Players from '../Players'
import Teams from '../Teams'

import './MainPage.css'

const MainPage = ({
	data,
    data: [
        playerData,
        teamData,
        bonusData
    ],
	showModal,
	loadData: refreshData,
}) => {
	const [display, setDisplay] = useState('teams')
	const [errors, setErrors] = useState([])

	useEffect(() => {
		setErrors(data.filter(resp => resp.error))
	}, [])

	const handleToggleBtn = () =>
		display === 'teams' ? setDisplay('players') : setDisplay('teams')

	const toggleBtn = (
		<button className='main-page-toggle-btn' onClick={handleToggleBtn}>
			{display}
		</button>
	)

    return errors.length
        ? <Errors {...{ errors }} />
        : <div className='MainPage'>

			{toggleBtn}

			{display === 'players' &&
				<Players
					{...{ playerData, bonusData, refreshData }}
				/>
			}

			{display === 'teams' &&
				<Teams
					{...{ teamData, showModal }}
				/>
			}

		</div>
}

export default MainPage
