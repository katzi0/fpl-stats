import React from 'react'
import ReactSelect from 'react-select'

const positions = [
  { label: 'Goalkeeper', value: 1 },
  { label: 'Defender', value: 2 },
  { label: 'Midfielder', value: 3 },
  { label: 'Forward', value: 4 },
]

function PositionFilter({ queryParams, setQueryParams }) {
  const selectedPosition = queryParams.position ? positions.filter(position => position.value === queryParams.position) : {}
  return (
    <>
      <ReactSelect
        options={positions}
        value={selectedPosition}
        onChange={(position) => setQueryParams({ position: position.value })}
        
      />
    </>
  )
}

export default PositionFilter
