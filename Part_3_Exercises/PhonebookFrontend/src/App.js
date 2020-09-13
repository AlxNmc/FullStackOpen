import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import Form from './components/Form'
import personService from './services/persons'

const Notification = ({ message, className }) => {
  if(message === null) {
    return null
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notificationText, setNotifyText ] = useState(null)
  const [ notificationClass, setNotifyClass ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(entries => {
        setPersons(entries)
      })
  }, [])

  const updatePerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const id = persons.filter(p => p.name === newName)[0].id

    personService
      .update(id, newPerson)
      .then( returnedPerson => {
        setPersons(persons.map(p => {
          if(p.name === returnedPerson.name){
            return returnedPerson
          }
          else return p
        }))

        setNewName('')
        setNewNumber('')
        setNotifyClass('pos_notification')
        setNotifyText(`Entry for ${returnedPerson.name} was updated`)
        setTimeout(() => setNotifyText(null), 2000)
      })
      .catch(() => {
        setNewName('')
        setNewNumber('')
        setNotifyClass('neg_notification')
        setNotifyText(`${newPerson.name} has already been removed from the server`)
        setPersons(persons.filter(p => p.name !== newPerson.name))
        setTimeout(() => setNotifyText(null), 2000)
      })
  }

  const createPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setNewName('')
        setNewNumber('')
        setNotifyClass('pos_notification')
        setNotifyText(`Added ${returnedPerson.name}`)
        setPersons(persons.concat(returnedPerson))
        setTimeout(() => setNotifyText(null), 2000)
      })
      .catch(error => {
        setNewName('')
        setNewNumber('')
        setNotifyClass('neg_notification')
        setNotifyText(`${error.response.data.error}`)
        setTimeout(() => setNotifyText(null), 5000)
      })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)){
      const shouldUpdate =
                window.confirm(`${newName} is already in the phonebook, replace old number with new one?`)
      if(shouldUpdate)
        updatePerson()
    }
    else {
      createPerson()
    }
  }

  const deletePerson = person => {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${person.name}?`)
    if(shouldDelete){
      personService
        .remove(person.id)
        .then(() => {
          setNotifyClass('pos_notification')
          setNotifyText(`Deleted ${person.name}`)
          setPersons(persons.filter(p => p !== person))
          setTimeout(() => setNotifyText(null), 2000)
        })
    }
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} inputHandler={handleFilterInput}/>
      <h2>add new entry</h2>
      <Notification message={notificationText} className={notificationClass}/>
      <Form
        name={newName}
        number={newNumber}
        nameHandler={handleNameInput}
        numberHandler={handleNumberInput}
        submitHandler={handleFormSubmit}
      />
      <h3>Numbers</h3>
      <Numbers
        persons={filteredPersons}
        deleteEntry={deletePerson}
      />
    </div>
  )
}

export default App