import React, { useState, useRef } from 'react'
import { postBonus } from '../../utilities/apiCalls'

import './PlayerForm.css'

const PlayerForm = ({ refreshData, playerData }) => {
	const [currentPlayerData, setCurrentPlayerData] = useState([])
	const [bonusDescription, setBonusDescription] = useState('')
	const [bonusAmount, setBonusAmount] = useState(1)
	const playerDropDownRef = useRef()

	const handleInputField = e => {
		setBonusDescription(e.target.value)
	}

	const handlePlayerDropDown = name => {
		const currentPlayerData = playerData.find(
			player => player.name === name
		)
		setCurrentPlayerData(currentPlayerData)
	}

	const handleBonusDropDown = bonusAmount => {
		setBonusAmount(bonusAmount)
	}

	const handleSumbit = async () => {
		await postBonus(currentPlayerData, bonusDescription, bonusAmount)
		await refreshData()

		setBonusDescription('')
	}

		const teamDropDownMenu = playerData.map((team, index) => {
			return (
				<option value={team.name} key={index}>
					{team.name}
				</option>
			)
		})

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
						handlePlayerDropDown(playerDropDownRef.value)
					}
				>
					{teamDropDownMenu}
				</select>
				{/* <select
					className='bonus-drop-down'
					ref={bonus => (this.bonus = bonus)}
					value={bonusAmount}
					onChange={() => handleBonusDropDown(bonus.value)}
				>
					{bonusDropDownMenu}
				</select> */}
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
