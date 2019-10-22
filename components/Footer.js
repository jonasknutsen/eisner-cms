import React from 'react'
import { version } from '../package.json'

class Footer extends React.Component {
  render = () => {
    return (
      <footer>
        Eisner CMS &copy; 2019 - Version {version}
        <style jsx>{`
          footer {
            background-color: rgb(195, 211, 212);
            padding: 1rem;
            text-align: center;
          }  
      `}</style>
      </footer>
    )
  }
}

export default Footer
