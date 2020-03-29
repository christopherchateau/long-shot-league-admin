import React from 'react'
import { deleteBonus } from '../../utilities/apiCalls'

import './Bonus.css'

export default ({ refreshData, bonus: { id, points, description } }) => {
	const handleDelete = async id => {
		await deleteBonus(id)
		refreshData()
	}

	return <div className='bonus'>
		<h5 className='delete-btn' onClick={() => handleDelete(id)}>
			X
		</h5>
		<h5 className='description'>{`${points} - ${description}`}</h5>
	</div>
}
