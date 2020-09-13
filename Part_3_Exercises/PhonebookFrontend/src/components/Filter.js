import React from 'react'

const Filter = ({ filter, inputHandler }) => (
  <div>
        filter names
    <input
      value={filter}
      onChange={inputHandler}
    />
  </div>
)

export default Filter