import React from 'react'

import './Errors.css'

export default ({ errors }) => (
	<div className='error'>

		<h1>ERROR</h1>

		{errors.map(error =>
			<h3 key={error}>{`- ${error}`}</h3>
		)}
	</div>
)
