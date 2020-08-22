import React from 'react'
import Weather from './Weather'

const CountryDetails = ({country}) => {
    return(
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="flag" width="200"/>
            <Weather location={country.capital}/>
        </div>
    )
}

const CountryList = ({countries, buttonHandler}) => {
    return(
    <div>
        {countries.map(country => 
            <li key={country.numericCode}>
                {country.name}
                <button onClick={buttonHandler(country.name)}>show</button>
            </li>)}
    </div>
    )
}

const Display = ({countries, buttonHandler}) => {
    if(countries.length === 1){
        return <CountryDetails country={countries[0]}/>
    }
    else if(countries.length <= 10){
        return <CountryList countries={countries} buttonHandler={buttonHandler}/>
    }
    else return <p>Too many matches, specify another filter</p>
}

export default Display