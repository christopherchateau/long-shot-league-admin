import React, { useContext, useState, useRef } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { postBonus } from '../../utilities/apiCalls'

import './PlayerForm.css'

const PlayerForm = () => {
	const {
		data: { playersData },
		refreshData,
	} = useContext(DataContext)

	const [currentPlayerData, setCurrentPlayerData] = useState([])
	const [bonusDescription, setBonusDescription] = useState('')
	const [bonusAmount, setBonusAmount] = useState(1)

	const playerDropDownRef = useRef()
	const bonusDropDownRef = useRef()

	const handleInputField = e => {
		setBonusDescription(e.target.value)
	}

	const handlePlayerDropDown = name => {
		const currentPlayerData = playersData.find(
			player => player.name === name
		)
		setCurrentPlayerData(currentPlayerData)
	}

	const handleBonusDropDown = bonusAmount => setBonusAmount(bonusAmount)

	const handleSumbit = async () => {
		await postBonus(currentPlayerData, bonusDescription, bonusAmount)
		await refreshData()

		setBonusDescription('')
	}

	const teamDropDownMenu = [{ name: '' }, ...playersData].map(
		(team, index) =>
			<option value={team.name} key={index}>
				{team.name}
			</option>
	)

	const bonusDropDownMenu = []
	for (let i = -1; i < 3; i++) {
		bonusDropDownMenu.push(
			<option value={i} key={i}>
				{i}
			</option>
		)
	}

	return (
		<div className='PlayerForm'>
			<select
				className='player-drop-down'
				ref={playerDropDownRef}
				value={currentPlayerData.name}
				onChange={() =>
					handlePlayerDropDown(playerDropDownRef.current.value)
				}
			>
				{teamDropDownMenu}
			</select>

			<select
				className='bonus-drop-down'
				ref={bonusDropDownRef}
				value={bonusAmount}
				onChange={() =>
					handleBonusDropDown(bonusDropDownRef.current.value)
				}
			>
				{bonusDropDownMenu}
			</select>

			<input
				onChange={handleInputField}
				className='bonus-input'
				type='text'
				value={bonusDescription}
				placeholder='bonus description'
			/>

			<button
				className='player-btn'
				onClick={handleSumbit}
				disabled={!bonusDescription.length || !currentPlayerData.id}
			>
				Sumbit
			</button>
		</div>
	)
}

export default PlayerForm
