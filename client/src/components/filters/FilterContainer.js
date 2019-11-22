import React, { useEffect, useState } from 'react'
import TeamFilter from './TeamFilter'
import PositionFilter from './PositionFilter'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import _pickBy from 'lodash/pickBy'
import _identity from 'lodash/identity'

const useStyles = makeStyles(theme => ({
  root: {
  },
  select: {
  },
}))

function FilterContainer({ collections, setFilterdPlayers }) {
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [queryParams, setQueryParams] = useState({ team: 1 })
  const setQueryParamsHandler = (param) => {
    setQueryParams({ ...queryParams, ...param })
  }
  const { players, teams } = collections

  const classes = useStyles()

  const queryByParams = (player) => {
    const modifiedQueryParams = _pickBy(queryParams,_identity)
    const result = Object.keys(modifiedQueryParams).map(key => (
      player[key] === queryParams[key]
    ))
    return !result.includes(false)
  }
  
  useEffect(() => {
    const { players, teams } = collections
    let modifiedPlayerList = []

    if (players) {
      modifiedPlayerList = players.filter(player => queryByParams(player)).map(player => ({
        label: player.name,
        value: player.name,
        ...player
      }))
      setFilterdPlayers(modifiedPlayerList)
    }

  }, [queryParams,])

  return (
    <>
        <Grid
          container
          direction="row"
          justify="flex-start"
          className={classes.root}
          spacing={2}
        >
          <Grid item xs={6}>
            <TeamFilter teams={teams} queryParams={queryParams} setQueryParams={setQueryParamsHandler} />
          </Grid>
          <Grid item xs={6}>
            <PositionFilter queryParams={queryParams} setQueryParams={setQueryParamsHandler} />
          </Grid>
        </Grid>
    </>
  )
}

export default FilterContainer
