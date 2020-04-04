import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { patchTeamData } from '../../utilities/apiCalls'
import { validatePtsInput as validate } from '../../utilities/helper'
import { enableBodyScroll } from 'body-scroll-lock'

import './TeamModal.css'

const TeamModal = () => {
	const {
		refreshData,
		closeModal,
		modalProps: { id, name, points, is_eliminated },
	} = useContext(DataContext)

	const [pointsInput, setPointsInput] = useState(points)
	const [isEliminated, setIsEliminated] = useState(is_eliminated)

	const targetElement = document.querySelector('.MainPage')

	useEffect(() => { submit() }, [isEliminated])

	const handleInputField = e => setPointsInput(e.target.value)

	const toggleSwitch = () => setIsEliminated(!isEliminated)

	const handleCloseClick = () => {
		enableBodyScroll(targetElement)
		closeModal()
	}

	const submit = async () => {
		await patchTeamData({
			name,
			points: parseInt(pointsInput),
			is_eliminated: isEliminated,
		})

		await refreshData()
	}

	return (
		<div className='overlay' style={{ top: `${window.scrollY}px` }}>
			<div
				className={'TeamModal'.concat(isEliminated ? ' redBg' : ' greenBg')}
			>
				<button className='close-modal-btn' onClick={handleCloseClick}>
					X
				</button>

				<h1>{name}</h1>

				<label className='switch'>
					<input
						type='checkbox'
						checked={isEliminated}
						onChange={toggleSwitch}
					/>
					<span className='slider' />
				</label>

				<input
					className='team-input'
					type='number'
					value={pointsInput}
					onChange={handleInputField}
				/>

				<button
					className='team-btn'
					disabled={validate(pointsInput) || !id}
					onClick={() => {
						submit()
						handleCloseClick()
					}}
				>
					Sumbit
				</button>
			</div>
		</div>
	)
}

export default TeamModal
