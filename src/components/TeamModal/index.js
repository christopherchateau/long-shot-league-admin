import React, { Component } from 'react'
import { patchTeamData } from '../../utilities/apiCalls'

import './TeamModal.css'

export default class TeamModal extends Component {
	state = {
		pointsInput: this.props.team.points,
		is_eliminated: this.props.team.is_eliminated,
	}

	handleInputField = e => this.setState({ pointsInput: e.target.value })

	toggleSwitch = () =>
		this.setState({ is_eliminated: !this.state.is_eliminated }, () =>
			this.submit({ close: false })
		)

	closeModal = () => {
		this.props.closeTeamModal()
	}

	submit = async ({ close }) => {
		const { pointsInput: points, is_eliminated } = this.state
		const { team: { name } , refreshData } = this.props

		await patchTeamData({ name, points, is_eliminated })
		await refreshData()

		if (close) this.closeModal()
	}

	render() {
		const { pointsInput, is_eliminated } = this.state
		const { name, id } = this.props.team

		return (
			<div
				className={'TeamModal'.concat(is_eliminated ? ' redBg' : ' greenBg')}
			>
				<button
					className='close-modal-btn'
					onClick={this.closeModal}
				>
					X
				</button>

				<h1>{name}</h1>

				<label className='switch'>
					<input
						type='checkbox'
						checked={is_eliminated}
						onChange={this.toggleSwitch}
					/>
					<span className='slider' />
				</label>

				<input
					onChange={this.handleInputField}
					className='team-input'
					type='number'
					value={pointsInput}
				/>

				<button
					className='team-btn'
					onClick={() => this.submit({ close: true })}
					disabled={!pointsInput.length || !id}
				>
					Sumbit
				</button>
			</div>
		)
	}
}
