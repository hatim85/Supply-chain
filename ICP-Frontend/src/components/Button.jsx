import React from 'react'

const Button = ({style, title,onClick}) => {
  return (
    <div className=''>
      <button
          className={` p-3 rounded-lg w-full  font-bold
         font-mono ${style} `}
         onClick={onClick}
        >
          {title}
        </button>
    </div>
  )
}

export default Button
