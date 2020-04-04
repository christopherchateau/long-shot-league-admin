import React, { useState, useEffect, createContext } from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { getData } from '../utilities/apiCalls'

export const DataContext = createContext()

const DataContextProvider = props => {
	const [data, setData] = useState(null)
	const [modalProps, setModalProps] = useState(null)

	useEffect(() => { loadData() }, [])

	const loadData = async () => {
		setData(await getData())
	}

	const openModal = props => {
		setModalProps(props)
		disableBodyScroll(document.querySelector('.MainPage'))
	}

	const closeModal = () => {
		setModalProps(null)
		clearAllBodyScrollLocks()
	}

	return (
		<DataContext.Provider
			value={{
				data,
				modalProps,
				openModal,
				closeModal,
				refreshData: loadData,
			}}
		>
			{props.children}
		</DataContext.Provider>
	)
}

export default DataContextProvider
