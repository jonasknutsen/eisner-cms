import React from 'react'
import PropTypes from 'prop-types'

const TextField = ({ text }) => (
  <button>
    <span>
      {text}
    </span>
    <style jsx>{`

  `}</style>
  </button>
)

TextField.propTypes = {
  text: PropTypes.string
}

export default TextField
