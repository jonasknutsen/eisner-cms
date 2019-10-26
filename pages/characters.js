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
          <TextField name='heroImage' label='Hero image' />
          <button>Add character</button>
        </form>
      </div>
    )
  }
}

export default Characters
