import React, { memo } from 'react'
import anonAvatar from '../assets/anon-avatar.png'
import { useNavigate } from 'react-router-dom'
import { BsTelephoneFill } from 'react-icons/bs'
import { SiZalo } from 'react-icons/si'
import { Button } from '../components'
import { useSelector } from 'react-redux';



const BoxInfo = ({ userData, postId, price, title, address, image }) => {
  
  const navigate = useNavigate()
  const handleRent = () => {
  
    navigate(`/rent`, {
      state: {
        postId,
        userId : userData?.id,
        price,
        title,
        address,
        userName: userData?.name,
        userPhone: userData?.phone,
        userZalo: userData?.zalo,
        image
      },
    });
  };
//   console.log("User ID:", userData?.id);
// console.log("Post ID:", postId);

  return (
    <div className='w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4'>
      <img src={anonAvatar} alt="avatar" className='w-16 h-16 object-contain rounded-full' />
      <h3 className='text-xl font-medium'>{userData?.name}</h3>
      <a className='bg-[#13BB7B] text-white font-bold text-lg py-2 flex items-center justify-center gap-2 w-full rounded-md' href={`tel:${userData?.phone}`}>
        <BsTelephoneFill />
        {userData?.phone}
      </a>
      <a className='bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md' href={`https://zalo.me/${userData?.zalo}`} target='_blank' rel="noreferrer">
        <SiZalo color='blue' size={30} />
      </a>
      <Button text='🚀 Thuê nhanh'
        className='bg-blue-600 text-white font-bold text-lg py-2 flex items-center justify-center gap-2 w-full rounded-md'
        onClick={handleRent} />
    </div>
  )
}
export default memo(BoxInfo)
