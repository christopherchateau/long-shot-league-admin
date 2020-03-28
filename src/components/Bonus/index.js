import React from 'react'
import { deleteBonus } from '../../utilities/apiCalls'

import './Bonus.css'

export default ({ refreshData, bonus: { id, points, description } }) => {
	const handleDelete = async id => {
		await deleteBonus(id)
		// await refreshData()
		refreshData()
	}

	return <div className='Bonus'>
		<h5 className='bonus-delete-btn' onClick={() => handleDelete(id)}>
			X
		</h5>
		<h5 className='bonus-description'>{`${description} (${points}pt)`}</h5>
	</div>
}
