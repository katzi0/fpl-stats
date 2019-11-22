import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    height:'80%',
    maxHeight: 500,
    overflowY:'auto',
  },
}))

export default function PlayerList({ players, onPlayerSelect }) {
  const classes = useStyles()
  const [checked, setChecked] = React.useState([1])

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <List dense className={classes.root}>
      {players.map(player => {
        const labelId = `checkbox-list-secondary-label-${player}`
        return (
          <ListItem key={player.name} button>
            <ListItemText id={labelId} primary={player.name} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(player)}
                checked={checked.indexOf(player) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}
