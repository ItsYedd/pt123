import React, { memo } from 'react'
import anonAvatar from '../assets/anon-avatar.png'
import { BsTelephoneFill } from 'react-icons/bs'
import {SiZalo} from 'react-icons/si'

const BoxInfo = ({userData}) => {
  return (
    <div className='w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4'>
      <img src={anonAvatar} alt="avatar" className='w-16 h-16 object-contain rounded-full' />
      <h3 className='text-xl font-medium'>{userData?.name}</h3>
      <a className='bg-[#13BB7B] text-white font-bold text-lg py-2 flex items-center justify-center gap-2 w-full rounded-md' href={`tel:${userData?.phone}`}>
        <BsTelephoneFill />
        {userData?.phone}
      </a>
      <a className='bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md' href={`https://zalo.me/${userData?.zalo}`}>
        <SiZalo color='blue' size={30}/>      
      </a>
      
    </div>
  )
}

export default memo(BoxInfo)
