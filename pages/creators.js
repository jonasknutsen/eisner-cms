import React from 'react'
import axios from 'axios'
import TextField from '../components/TextField'

class Creators extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      heroImage: '',
      responseMessage: ''
    }
  }

  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleAddCreator = (event) => {
    event.preventDefault()
    axios.post('/api/v1/characters', {
      name: this.state.name,
      description: this.state.description,
      heroImage: this.state.heroImage
    })
      .then((response) => {
        this.setState({ responseMessage: response })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ responseMessage: error })
      })
  }

  render = () => {
    return (
      <div>
        <h2>Creators</h2>
        <form onSubmit={this.handleAddCharacter}>
          <div className='form-wrapper'>
            <TextField name='name' label='Name' onChange={this.handleChange} />
            <TextField name='description' label='Description' onChange={this.handleChange} />
            <TextField name='heroImage' label='Hero image' onChange={this.handleChange} />
            <button type='submit'>Add creator</button>
          </div>
        </form>
        {this.state.responseMessage}
      </div>
    )
  }
}

export default Creators
