import React, { useEffect, useState } from 'react'
import TeamFilter from './TeamFilter'
import PositionFilter from './PositionFilter'

function FilterContainer({ collections, setFilterdPlayers }) {
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [queryParams, setQueryParams] = useState({ team: 1 })
  const setQueryParamsHandler = (param) => {
    setQueryParams({ ...queryParams, ...param })
  }
  const { players, teams } = collections
  
  useEffect(() => {
    const { players, teams } = collections
    let modifiedPlayerList = []
    const queryByParams = (player) => {
      const result = Object.keys(queryParams).map(key => (
        player[key] === queryParams[key]
      ))
      return !result.includes(false)
    }
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
    <div>
      <TeamFilter teams={teams} queryParams={queryParams} setQueryParams={setQueryParamsHandler} />
      <PositionFilter queryParams={queryParams} setQueryParams={setQueryParamsHandler} />
    </div>
  )
}

export default FilterContainer