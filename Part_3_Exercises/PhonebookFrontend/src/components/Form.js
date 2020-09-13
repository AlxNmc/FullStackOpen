import React from 'react'

const Form = (props) => (
  <form>
    <div>
            name:
      <input
        value={props.name}
        onChange={props.nameHandler}
      />
    </div>
            number:
    <input
      value={props.number}
      onChange={props.numberHandler}
    />
    <div>
      <button type="submit" onClick={props.submitHandler}>add</button>
    </div>
  </form>
)

export default Form