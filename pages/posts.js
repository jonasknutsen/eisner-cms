import React from 'react'
import TextField from '../components/TextField'

class Posts extends React.Component {
  render = () => {
    return (
      <div>
        <h2>Posts</h2>
        <form>
          <TextField name='title' label='Title' />
          <TextField name='content' label='Content' multiline />
          <TextField name='excerpt' label='Excerpt' />
          <TextField name='metaDescription' label='Meta description' />
          <input type='text' name='published' />
          <input type='text' name='comic' />
          <button>Add creator</button>
        </form>
      </div>
    )
  }
}

export default Posts
