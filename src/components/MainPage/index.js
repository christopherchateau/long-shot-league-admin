import React, { useState } from 'react'
import Players from '../Players'
import Teams from '../Teams'

import './MainPage.css'

const MainPage = () => {
	const [display, setDisplay] = useState('teams')

	const handleToggleBtn = () =>
		display === 'teams' ? setDisplay('players') : setDisplay('teams')

	const toggleBtn = (
		<button className='main-page-toggle-btn' onClick={handleToggleBtn}>
			{display}
		</button>
	)
	return (
		<div className='MainPage'>
			{toggleBtn}

			{display === 'players' && <Players />}

			{display === 'teams' && <Teams />}
		</div>
	)
}

export default MainPage
