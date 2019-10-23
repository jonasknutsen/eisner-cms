import React from 'react'
import TextField from '../components/TextField'

class Characters extends React.Component {
  render = () => {
    return (
      <div>
        <h2>Characters</h2>
        <form>
          <TextField name='name' label='Name' />
          <TextField name='description' label='Description' />
          <input type='text' name='heroImage' />
          <button>Add character</button>
        </form>
      </div>
    )
  }
}

export default Characters
