import React, { Component } from 'react'
import Players from '../Players'
import Teams from '../Teams'
import LoadingPage from '../LoadingPage'
import { getData } from '../../utilities/apiCalls'

import './MainPage.css'

export default class MainPage extends Component {
    state = {
        display: 'teams',
        teamData: [],
        playerData: [],
        bonusData: [],
        errors: [],
    }

    componentDidMount = async () => {
        const data = await getData()
        const errors = data.filter(resp => resp.error)
        const [playerData, teamData, bonusData] = data

        errors.length
            ? this.setState({ errors })
            : this.setState({ playerData, teamData, bonusData })
    }

    refreshData = () => this.componentDidMount()

    handleToggleBtnClick = () => {
        let display = ''
        this.state.display === 'teams'
            ? display = 'players'
            : display = 'teams'
        this.setState({ display })
    }

    render() {
        const { playerData, teamData, bonusData, display } = this.state

        if (!playerData.length || !teamData.length || !bonusData.length) {
            return (
                <div className='MainPage'>
                    <LoadingPage />
                </div>
            )
        } else {
            return (
                <div className='MainPage'>
                    <button
                        className='main-page-toggle-btn'
                        onClick={this.handleToggleBtnClick}
                    >
                        {display}
                    </button>

                    {display === 'players' &&
                        <Players
                            {...{ playerData, bonusData, refreshData: this.refreshData }}
                        />
                    }

                    {display === 'teams' &&
                        <Teams {...{ teamData, refreshData: this.refreshData }} />
                    }
                </div>
            )
        }
    }
}
