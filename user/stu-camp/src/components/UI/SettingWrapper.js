import React from 'react'

const SettingWrapper = (props) => {
  return (
    <div className='mt-5 lg:ml-[220px] lg:w-[80%] h-screen sm:max-lg:mx-[28px] lg:max-xl:w-[75%]'>
        {props.children}
    </div>
  )
}

export default SettingWrapper