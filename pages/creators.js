import React from 'react'
import TextField from '../components/TextField'

class Creators extends React.Component {
  render = () => {
    return (
      <div>
        <h2>Creators</h2>
        <form>
          <div className='form-wrapper'>
            <TextField name='name' label='Name' />
            <TextField name='description' label='Description' />
            <input type='text' name='heroImage' />
            <button>Add creator</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Creators
