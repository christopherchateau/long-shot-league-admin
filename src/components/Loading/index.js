import React from 'react'
import loadingImg from '../../images/loading.gif'
import './Loading.css'

export default () =>
	<div className='Loading'>
		<img className='loading-img' alt='loading' src={loadingImg} />
	</div>
