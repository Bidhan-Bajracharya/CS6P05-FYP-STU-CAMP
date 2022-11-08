import React from 'react'

const H1 = (props) => {
  return (
    <div className='text-4xl text-[#FFA500] font-medium mb-4'>
      <div className='pl-2'>
        {props.children}
      </div>
        <hr className="bg-[#FFA500] h-[1px] border-0" />
    </div>
  )
}

export default H1