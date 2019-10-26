import React from 'react'
import PropTypes from 'prop-types'

const TextField = ({ name, label, ...rest }) => (
  <div className='text-field'>
    <label>
      {label}
      <input type='text' name={name} {...rest} />
    </label>
    <style jsx>{`
      .text-field {
        margin-bottom: 1rem;
      }
      label {
        display: flex;
        flex-direction: column;
      }
      input {
        line-height: 1rem;
        font-size: 1rem;
        margin-top: .3rem;
        padding: .4rem;
      }
  `}</style>
  </div>
)

TextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string
}

export default TextField
