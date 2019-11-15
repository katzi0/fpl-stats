import React, { useEffect, useState } from 'react'
import './App.css'
import * as axios from 'axios'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import FilterContainer from './components/filters/FilterContainer'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}))


const App = () => {
  const classes = useStyles()
  const [collections, setCollection] = useState({
    teams: [],
    players: null
  })
  const [filterdPlayers, setFilterdPlayers] = useState(null)
  useEffect(() => {
    axios.get('http://localhost:3000/fpl/inital-data').then(({ data }) => {
      const { teams: teamsRaw, players: playersRaw } = data
      const players = playersRaw && playersRaw.map(player => (
        {
          name: `${player.first_name} ${player.second_name}`,
          team: player.team,
          position: player.element_type,
        }
      ))
      const teams = teamsRaw && teamsRaw.map(team => {
        return { value: team.id, label: team.name }
      })
      setCollection({ teams, players })
    })
  }, [])
  return (
    <div className={classes.root}>
      <Grid container className={classes.root}>
        <FilterContainer collections={collections} setFilterdPlayers={setFilterdPlayers} />
      </Grid>
    </div>
  )
}

export default App
