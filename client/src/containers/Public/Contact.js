import React, { useState } from 'react'
import { InputForm, Button } from '../../components'
import Swal from 'sweetalert2'

const Contact = () => {
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        content: ''
    })
    const handleSubmit = () => {
        Swal.fire('Thanks', 'Phản hồi của bạn đã được ghi nhận', 'success').then(() => {
            setPayload({
                name: '',
                phone: '',
                content: ''
            })
        })
    }
    return (
        <div className='w-full'>
            <h1 className='text-2xl font-semibold mb-4'>Liên hệ với chúng tôi</h1>
            <div className='flex gap-4'>
                <div className='flex-1 flex flex-col gap-4 h-fit bg-blue-300 rounded-3xl p-4 text-white bg-gradient-to-br from-blue-500 to-cyan-300'>
                    <h4 className='font-medium'>Thông tin liên hệ</h4>
                    <span>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Cảm ơn vì đã chọn chúng tôi</span>
                    <span>Điện thoại : 0905 982 960</span>
                    <span>Email : pt1231@gmail.com</span>
                    <span>Zalo : 0905 982 960</span>
                    <span>Viber : 0905 982 960</span>
                    <span>Địa chỉ : 459 Tôn Đức Thắng, phường Hòa Khánh Nam, quận Liên Chiểu, thành phố Đà Nẵng</span>
                </div>
                <div className='flex-1 bg-white shadow-md rounded-md p-4 mb-6'>
                    <h4 className='font-medium mb-4'>Liên hệ trực tuyến</h4>
                    <div className='flex flex-col gap-6'>
                        <InputForm
                            label='HỌ VÀ TÊN CỦA BẠN'
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload='name'
                        />
                        <InputForm
                            label='SỐ ĐIỆN THOẠI'
                            value={payload.phone}
                            setValue={setPayload}
                            keyPayload='phone'
                            />
                        <div>
                            <label htmlFor="desc">NỘI DUNG</label>
                            <textarea
                                className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
                                value={payload.content}
                                onChange={e => setPayload(prev => ({...prev, content : e.target.value}))}
                                id="desc"
                                cols="30" row="5"
                                name='content'></textarea>
                        </div>
                        <Button
                            text='Gửi liên hệ'
                            bgColor='bg-blue-500'
                            textColor='text-white'
                            fullWidth
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
