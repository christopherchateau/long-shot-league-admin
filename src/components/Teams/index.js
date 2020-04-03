import React, { useState, useContext } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { disableBodyScroll } from 'body-scroll-lock'

import './Teams.css'

const Teams = () => {
	let {
		data: [, teamData],
	} = useContext(DataContext)

	const [display, setDisplay] = useState('show all')
	const [searchInput, setSearchInput] = useState('')
	const targetElement = document.querySelector('.MainPage')

	const toggleDisplay = () =>
		display === 'show all'
			? setDisplay('still alive')
			: setDisplay('show all')

	const handleTeamClick = selectedTeam => {
		disableBodyScroll(targetElement)
		// showModal(selectedTeam)
	}

	const handleSearchInput = ({ target }) => setSearchInput(target.value)

	if (display === 'still alive') {
		teamData = teamData.filter(({ is_eliminated }) => !is_eliminated)
	}

	if (searchInput) {
		teamData = teamData.filter(({ name }) =>
			name.toLowerCase().includes(searchInput.toLowerCase())
		)
	}

	const teams = teamData.map(team => (
		<div
			className={'team'.concat(team.is_eliminated ? ' red' : ' green')}
			key={team.name}
			onClick={() => handleTeamClick(team)}
		>
			<h3>
				{team.name} - {team.points}
			</h3>
			<h5>{team.drafted_by}</h5>
		</div>
	))

	return (
		<div>
			<div className='team-controls'>
				<input
					className='search'
					placeholder='search'
					type='text'
					value={searchInput}
					onChange={handleSearchInput}
				/>

				<button className='toggle-btn' onClick={toggleDisplay}>
					{display}
				</button>
			</div>

			<div className='Teams'>{teams}</div>
		</div>
	)
}

export default Teams
