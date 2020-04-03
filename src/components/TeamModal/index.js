import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { patchTeamData } from '../../utilities/apiCalls'
import { enableBodyScroll } from 'body-scroll-lock'

import './TeamModal.css'

const TeamModal = ({
	team: { id, name, points, is_eliminated },
	showModal,
}) => {
	const { refreshData } = useContext(DataContext)

	const [pointsInput, setPointsInput] = useState(points)
	const [isEliminated, setIsEliminated] = useState(is_eliminated)
	const targetElement = document.querySelector('.MainPage')

	useEffect(() => {
		submit()
	}, [isEliminated])

	const handleInputField = e => setPointsInput(e.target.value)

	const toggleSwitch = () => setIsEliminated(!isEliminated)

	const closeModal = () => {
		enableBodyScroll(targetElement)
		showModal(false)
	}

	const validateInput = input => !input.toString().length

	const submit = async () => {
		await patchTeamData({
			name,
			points: pointsInput,
			is_eliminated: isEliminated,
		})

		await refreshData()
	}

	return (
		<div className='overlay' style={{ top: `${window.scrollY}px` }}>
			<div
				className={'TeamModal'.concat(
					isEliminated ? ' redBg' : ' greenBg'
				)}
			>
				<button className='close-modal-btn' onClick={closeModal}>
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
					disabled={validateInput(pointsInput) || !id}
					onClick={() => {
						submit()
						closeModal()
					}}
				>
					Sumbit
				</button>
			</div>
		</div>
	)
}

export default TeamModal
