import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
}

const Total = ({ course }) => {
    const sum = 
        course.parts.reduce((acc, part) => acc + part.exercises, 0)
    return(
        <b>Number of exercises {sum}</b>
    ) 
}

const Part = ({part}) => (
    <p>
        {part.name} {part.exercises}
    </p>    
)

const Content = ({ course }) => (
    <div>
        {course.parts.map((part, i) => 
        <Part key={i} part={part}/>
        )}
    </div>
)

const Course = ({course}) => (
    <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>
)

export default Course