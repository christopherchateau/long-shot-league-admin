import React, { useContext, useState } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { DisplayContext } from '../../contexts/DisplayContext'

import './Teams.css'

const Teams = () => {
	const { openModal } = useContext(DisplayContext)
	const {
		data: { teamsData },
	} = useContext(DataContext)

	const [display, setDisplay] = useState('show all')
	const [searchInput, setSearchInput] = useState('')

	let filteredTeams = [...teamsData]

	if (display === 'still alive')
		filteredTeams = filteredTeams.filter(
			({ is_eliminated }) => !is_eliminated
		)

	if (searchInput)
		filteredTeams = filteredTeams.filter(({ name }) =>
			name.toLowerCase().includes(searchInput.toLowerCase())
		)

	const toggleDisplay = () =>
		display === 'show all'
			? setDisplay('still alive')
			: setDisplay('show all')

	const handleSearchInput = ({ target }) => setSearchInput(target.value)

	const teams = filteredTeams.map(team =>
		<div
			className={'team'.concat(team.is_eliminated ? ' red' : ' green')}
			key={team.name}
			onClick={() => openModal(team)}
		>
			<h3>
				{team.name} - {team.points}
			</h3>
			<h5>{team.drafted_by}</h5>
		</div>
	)

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
