import React from 'react'

function EmptyView(props) {
  const {message} = props; 
  return (
    <div className="flex-1 flex items-center justify-center w-full h-[140px] my-8 px-10 text-center">
      <p className="text-xl font-medium text-gray-500">{message}</p>
    </div>
  )
}

export default EmptyView
