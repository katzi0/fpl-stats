import React from 'react'
import ReactSelect from 'react-select'

const TeamFilter = ({ teams = [], queryParams = {}, setQueryParams }) => {
  const selectedTeam = queryParams.team ? teams.filter(team => team.value === queryParams.team) : {}
  return (
    <ReactSelect
      isDisabled={!teams}
      options={teams}
      onChange={(team) => {
        setQueryParams({ team: team ? team.value : null })
      }}
      value={selectedTeam}
      isClearable={true}
    />
  )
}
export default TeamFilter