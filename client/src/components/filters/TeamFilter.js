import React from 'react'
import ReactSelect from 'react-select'

const TeamFilter = ({ teams = [], queryParams = {}, setQueryParams }) => {
  const selectedTeam = queryParams.team ? teams.filter(team => team.value === queryParams.team) : {}
  return (
    <ReactSelect
      isDisabled={!teams}
      options={teams}
      onChange={(team) => {
        setQueryParams({ team: team.value })
      }}
      value={selectedTeam}
    />
  )
}
export default TeamFilter