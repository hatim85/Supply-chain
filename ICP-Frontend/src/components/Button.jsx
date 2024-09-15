import React from 'react'

const Button = ({style, title}) => {
  return (
    <div className=''>
      <button
          className={` p-3 rounded-lg w-full  font-bold
         font-mono ${style} `}
        >
          {title}
        </button>
    </div>
  )
}

export default Button
