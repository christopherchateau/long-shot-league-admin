import React, { Component } from 'react'
import Players from '../Players'
import Teams from '../Teams'
import LoadingPage from '../LoadingPage'
import { getData } from '../../apiCalls'
import './MainPage.css'

class MainPage extends Component {
    state = {
        display: 'teams',
        teamData: [],
        playerData: [],
        bonusData: [],
        errors: [],
    }

    componentDidMount = () => this.loadData()

    loadData = async () => {
        const data = await getData()
        console.log(data)
        const errors = data.filter(resp => resp.error)
        const [playerData, teamData, bonusData] = data

        errors.length
            ? this.setState({ errors })
            : this.setState({
                  playerData: this.sortByName(playerData),
                  teamData: this.sortByName(teamData),
                  bonusData,
              })
    }

    handleToggleBtnClick = () => {
        let display = ''
        this.state.display === 'teams'
            ? (display = 'players')
            : (display = 'teams')
        this.setState({ display })
    }

    sortByName = input =>
        input.sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
        })

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
                            {...{ playerData, bonusData, loadData: this.loadData }}
                        />
                    }

                    {display === 'teams' &&
                        <Teams {...{ teamData, loadData: this.loadData }} />
                    }
                </div>
            )
        }
    }
}

export default MainPage
