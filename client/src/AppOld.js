import React, { useEffect, useState } from 'react'
import './App.css'
import * as axios from 'axios'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import FilterContainer from './components/filters/FilterContainer'
import PlayerList from './components/filters/PlayerList'
import PlayerCard from './components/PlayerCard'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
  },
}))

const App = () => {
  const classes = useStyles()
  const [collections, setCollection] = useState({
    teams: [],
    players: null
  })
  const [filterdPlayers, setFilterdPlayers] = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState({})
  const onPlayerSelectHandler = async (player) => {
    const { data: { photoUrl } } = await axios.get(`http://localhost:5000/fpl/player/${player.id}`)
    setSelectedPlayer({ ...player, photoUrl })
  }

  useEffect(() => {
    axios.get('http://localhost:5000/fpl/inital-data').then(({ data }) => {
      const { teams: teamsRaw, players: playersRaw } = data
      const players = playersRaw && playersRaw.map(player => (
        {
          name: `${player.first_name} ${player.second_name}`,
          team: player.team,
          position: player.element_type,
          id: Number.parseInt(player.id),
          photoUrl: player.photoUrl,
        }
      ))
      const teams = teamsRaw && teamsRaw.map(team => {
        return { value: team.id, label: team.name }
      })
      setCollection({ teams, players })
    })
  }, [])
  return (
      <Grid container className={classes.root}>
          <FilterContainer collections={collections} setFilterdPlayers={setFilterdPlayers} />
        {
          filterdPlayers &&
          <Grid container className={classes.root}>
            <PlayerList players={filterdPlayers} onPlayerSelect={onPlayerSelectHandler} />
          </Grid>
        }
        <Grid container className={classes.root}>
          <PlayerCard selectedPlayer={selectedPlayer} />
        </Grid>
      </Grid>
  )
}

export default App
