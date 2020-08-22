import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Display from './components/Display'

const App = () => {
    const [Countries, setCountries] = useState([])
    const [newFilter, changeFilter] = useState("")

    useEffect(() => {
        Axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    },[])

    const inputHandler = (event) => {
        changeFilter(event.target.value)
    }

    const selectHandler = (filter) => {
        return ()=>changeFilter(filter)
    }

    const filtered = Countries.filter(country => 
        country.name.toLowerCase().includes(newFilter.toLowerCase()))
    

    return (
        <div>
            find countries
            <input value={newFilter} onChange={inputHandler}/>
            <Display countries={filtered} buttonHandler={selectHandler} />
        </div>
    )
}

export default App