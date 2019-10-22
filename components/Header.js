import React from 'react'

class Header extends React.Component {
  render = () => {
    return (
      <header>
        <h1>EISNER CMS</h1>
        <style jsx>{`
        header {
          background-color: rgb(217, 72, 72);
          padding: 1rem;
        } 
        h1 {
          margin: 0;
          letter-spacing: .7rem;
        }
      `}</style>
      </header>
    )
  }
}

export default Header
