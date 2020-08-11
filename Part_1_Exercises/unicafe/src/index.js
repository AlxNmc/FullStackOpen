import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = props => <button onClick={props.onClick}>{props.text}</button>

const Statistic = props => (
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>
)

const Statistics = ({good, bad, neutral}) => {
  const total = good + neutral + bad
  return total ? (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text={'good'} value={good}/>
          <Statistic text={'neutral'} value={neutral}/>
          <Statistic text={'bad'} value={bad}/>
          <Statistic text={'all'} value={total}/>
          <Statistic text={'average'} value={(good - bad)/total}/>
          <Statistic text={'positive'} value={good/total * 100 + '%'}/>
        </tbody>
      </table>
    </div>
  ) :
  (
    <div>
      <h1>statistics</h1>
      No feedback given
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttonHandler = (hookFunc, val) => {
    return ()=>hookFunc(val + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={buttonHandler(setGood, good)} text={'good'}/>
      <Button onClick={buttonHandler(setNeutral, neutral)} text={'neutral'}/>
      <Button onClick={buttonHandler(setBad, bad)} text={'bad'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)