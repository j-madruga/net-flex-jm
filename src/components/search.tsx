import React from 'react'

type Props = {
  searchTerm?: string
  setSearchTerm?: (term: string) => void
}

const search = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className='search'>
      <div>
        <img src="search.svg" alt="Seach icon" />
        <input 
          type="text" 
          placeholder='Search through thousands of movies...' 
          value={searchTerm}
          onChange={(e) => setSearchTerm?.(e.target.value)}
        />
      </div>
    </div>
  )
}

export default search