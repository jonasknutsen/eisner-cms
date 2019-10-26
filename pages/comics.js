import React from 'react'
import fetch from 'isomorphic-unfetch'
import axios from 'axios'
import TextField from '../components/TextField'

class Comics extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      character: '',
      heroImage: '',
      artist: '',
      inker: '',
      colorist: '',
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

  handleAddComic = (event) => {
    event.preventDefault()
    axios.post('/api/v1/comics', {
      name: this.state.name,
      description: this.state.description,
      character: this.state.character,
      heroImage: this.state.heroImage,
      artist: this.state.artist,
      inker: this.state.inker,
      colorist: this.state.colorist
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
        <h2>Comics</h2>
        <form onSubmit={this.handleAddComic}>
          <TextField name='name' label='Name' onChange={this.handleChange} />
          <TextField name='description' label='Description' onChange={this.handleChange} />
          <input type='text' name='character' onChange={this.handleChange} />
          <TextField name='heroImage' label='Hero image' onChange={this.handleChange} />
          <input type='text' name='artist' onChange={this.handleChange} />
          <input type='text' name='inker' onChange={this.handleChange} />
          <input type='text' name='colorist' onChange={this.handleChange} />
          <button>Add comic</button>
        </form>
      </div>
    )
  }
}

Comics.getInitialProps = async ({ req }) => {
  const creatorsRes = await fetch('http://localhost:3000/api/v1/creators')
  const creatorsJson = await creatorsRes.json()
  console.log('creatorsJson', creatorsJson)
  // const charactersRes = await fetch('/api/v1/characters')
  // const charactersJson = await charactersRes.json()
  return { creators: creatorsJson }
}

export default Comics
