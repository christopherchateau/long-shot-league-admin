import React, { Component } from 'react'
import Players from '../Players'
import Teams from '../Teams'

import './MainPage.css'

export default class MainPage extends Component {
    state = { display: 'teams' }

    handleToggleBtnClick = () => {
        let display = ''
        this.state.display === 'teams'
            ? display = 'players'
            : display = 'teams'
        this.setState({ display })
    }

    get showPlayers() {
        return this.state.display === 'players'
    }

    get showTeams() {
        return this.state.display === 'teams'
    }

    render() {
        const { display } = this.state
        const { showModal, data } = this.props
        const [playerData, teamData, bonusData] = data

        return <div className='MainPage'>
            <button
                className='main-page-toggle-btn'
                onClick={this.showTargetElement}
            >
                {display}
            </button>

            {this.showPlayers &&
                <Players
                    {...{
                        playerData,
                        bonusData,
                        refreshData: this.refreshData
                    }}
                />
            }

            {this.showTeams &&
                <Teams {...{ teamData, showModal, refreshData: this.refreshData }} />
            }
        </div>
    }
}
