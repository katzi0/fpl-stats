import React from 'react'
import ReactSelect from 'react-select'
import Grid from '@material-ui/core/Grid'

const PlayerList = ({ players, onPlayerSelect }) => {
  return (
    <Grid item xs={12}>
      <ReactSelect
        options={players}
        isDisabled={!players}
        onChange={(player) => onPlayerSelect(player)}
      />
    </Grid>
  )
}
export default PlayerList
