import React from 'react'
import TextField from '../components/TextField'

class Comics extends React.Component {
  render = () => {
    return (
      <div>
        <h2>Comics</h2>
        <form>
          <TextField name='name' label='Name' />
          <TextField name='description' label='Description' />
          <input type='text' name='character' />
          <input type='text' name='heroImage' />
          <input type='text' name='artist' />
          <input type='text' name='inker' />
          <input type='text' name='colorist' />
          <button>Add comic</button>
        </form>
      </div>
    )
  }
}

export default Comics
