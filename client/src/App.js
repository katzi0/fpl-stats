import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import { green, orange } from '@material-ui/core/colors'
import * as axios from 'axios'
import FilterContainer from './components/filters/FilterContainer'
import PlayerList from './components/filters/PlayerList'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: orange[500],
    },
    secondary: {
      main: green[500],
    },
  }
})

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '90vh',
    width: '90vw',
    marginTop: '10px',
  },
  paper: {
    height: '90%',
    width: '90%',
    background: 'transparent',
  },
  control: {
    padding: theme.spacing(2),
  },
  PlayerList: {
    flexGrow: '1',
  },
  filterContainer: {}
}))

export default function App() {
  const classes = styles()
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
    <ThemeProvider theme={theme}>
      <Grid
        className={classes.root}
        spacing={2}
        container
        direction="row"
        justify="center"
      >
        <Grid
          container
          direction="column"
          justify="space-around"
        >
          <Grid
            container
            direction="row"
          >
            <Grid item xs={6} className={classes.filterContainer}>
              <FilterContainer collections={collections} setFilterdPlayers={setFilterdPlayers} />
            </Grid>
          </Grid>
          <Grid item xs={3} className={classes.PlayerList}>
            {
              filterdPlayers &&
              <PlayerList players={filterdPlayers} onPlayerSelect={onPlayerSelectHandler} />
            }
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}