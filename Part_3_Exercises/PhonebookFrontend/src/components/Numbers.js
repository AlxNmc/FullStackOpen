import React from 'react'

const Person = ({ person, deleteEntry }) => (
  <p>
    {person.name}  {person.number}
    <button onClick={() => deleteEntry(person)}>delete</button>
  </p>
)

const Numbers = ({ persons, deleteEntry }) => {

  const buildList = () => {
    return persons.map(person =>
      <Person
        key={person.id}
        person={person}
        deleteEntry={deleteEntry}
      />
    )
  }
  return <div>{buildList()}</div>
}

export default Numbers