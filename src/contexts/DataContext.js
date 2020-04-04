import React, { useState, useEffect, createContext } from 'react'
import { getData } from '../utilities/apiCalls'

export const DataContext = createContext()

const DataContextProvider = props => {
	const [data, setData] = useState(null)
	const [modalProps, setModalProps] = useState(null)

	useEffect(() => { loadData() }, [])

	const loadData = async () => {
		setData(await getData())
	}

	const closeModal = () => setModalProps(null)

	return (
		<DataContext.Provider
			value={{
				data,
				refreshData: loadData,
				modalProps,
				setModalProps,
				closeModal,
			}}
		>
			{props.children}
		</DataContext.Provider>
	)
}

export default DataContextProvider
