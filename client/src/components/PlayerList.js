import React from 'react'
import ReactSelect from 'react-select'

const PlayerList = ({ players }) => {
  console.log('players:', players)
  return (
    <ReactSelect
      options={players}
      isDisabled={!players}
    />
  )
}
export default PlayerList