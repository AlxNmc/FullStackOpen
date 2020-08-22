import React from 'react'
import Course from './components/Course'

const App = ({courses}) => (
    <div>
        <h1>Web development curriculum</h1>
        {courses.map( (course, i) => 
            <Course key={i} course={course}/>
        )}
    </div>
)

export default App