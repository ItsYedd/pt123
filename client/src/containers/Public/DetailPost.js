import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/actions'
import { SliderCustom, Map, BoxInfo, RelatedPost } from '../../components'
import icons from '../../ultils/icons'
import { BsHash, BsStopwatch } from 'react-icons/bs'
import { underMap } from '../../ultils/constant'

const {   TbReportMoney, RiCrop2Line,  HiLocationMarker } = icons

const DetailPost = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)
    //console.log(posts)

    useEffect(() => {
        postId && dispatch(getPostsLimit({ id: postId }))
    }, [postId, dispatch])
    return (
        <div className='w-full flex gap-4'>
            <div className='w-[70%]'>
                <SliderCustom images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)} />
                <div className='bg-white rounded-md shadow-md p-4'>
                    <div className='gap-2 flex flex-col'>
                        <h2 className='text-xl font-bold text-red-500'>{posts[0]?.title}</h2>

                        <div className='flex items-center gap-2  '>
                            <span>Chuyên mục : </span>
                            <span className='hover:text-orange-500 cursor-pointer underline font-medium text-blue-600'>{posts[0]?.overviews?.area}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <HiLocationMarker color='#2563eb' />
                            <span className=''>{posts[0]?.address}</span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='flex items-center gap-1'>
                                <TbReportMoney />
                                {posts[0]?.attributes.price}
                            </span>
                            <span className='flex items-center gap-1'>
                                <RiCrop2Line />
                                {posts[0]?.attributes.acreage}
                            </span>
                            <span className='flex items-center gap-1'>
                                <BsStopwatch />
                                {posts[0]?.attributes.published}
                            </span>
                            <span className='flex items-center gap-1'>
                                <BsHash />
                                {posts[0]?.attributes.hashtag}
                            </span>
                        </div>
                        <div className='mt-5 '>
                            <h3 className='text-xl font-bold my-4'>Thông tin mô tả</h3>
                            <div className='flex flex-col gap-2'>
                                {posts[0]?.description && JSON.parse(posts[0]?.description)?.map((item, index) => {
                                    return (
                                        <span key={index}>{item}</span>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='mt-5'>
                            <h3 className='text-xl font-bold my-4'>Đặc điểm tin đăng</h3>
                            <table className='w-full'>
                                <tbody className='w-full'>
                                    <tr className='w-full  bg-gray-200'>
                                        <td className='p-4'>Mã tin</td>
                                        <td className='p-4'>{posts[0]?.overviews?.code}</td>
                                    </tr>
                                    <tr className='w-full '>
                                        <td className='p-4'>Khu vực</td>
                                        <td className='p-4'>{posts[0]?.overviews?.area}</td>
                                    </tr>
                                    <tr className='w-full  bg-gray-200'>
                                        <td className='p-4'>Loại tin rao</td>
                                        <td className='p-4'>{posts[0]?.overviews?.type}</td>
                                    </tr>
                                    <tr className='w-full'>
                                        <td className='p-4'>Đối tượng</td>
                                        <td className='p-4'>{posts[0]?.overviews?.target}</td>
                                    </tr>
                                    <tr className='w-full bg-gray-200'>
                                        <td className='p-4'>Gói tin</td>
                                        <td className='p-4'>{posts[0]?.overviews?.bonus}</td>
                                    </tr>
                                    <tr className='w-full'>
                                        <td className='p-4'>Ngày đăng</td>
                                        <td className='p-4'>{posts[0]?.overviews?.created}</td>
                                    </tr>
                                    <tr className='w-full bg-gray-200'>
                                        <td className='p-4'>Ngày hết hạn</td>
                                        <td className='p-4'>{posts[0]?.overviews?.expired}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-5'>
                            <h3 className='text-xl font-bold my-4'>Đặc điểm tin đăng</h3>
                            <table className='w-full'>
                                <tbody className='w-full'>
                                    <tr className='w-full'>
                                        <td className='p-4'>Liên hệ</td>
                                        <td className='p-4'>{posts[0]?.user?.name}</td>
                                    </tr>
                                    <tr className='w-full bg-gray-200'>
                                        <td className='p-4'>Điện thoại</td>
                                        <td className='p-4'>{posts[0]?.user?.phone}</td>
                                    </tr>
                                    <tr className='w-full'>
                                        <td className='p-4'>Zalo</td>
                                        <td className='p-4'>{posts[0]?.user?.zalo}</td>
                                    </tr>
                                    <tr className='w-full bg-gray-200'>
                                        <td className='p-4'>Facebook</td>
                                        <td className='p-4'>{posts[0]?.user?.fbUrl}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-5'>
                            <h3 className='text-xl font-bold my-4'>Bản đồ</h3>
                            <div><Map address={posts[0]?.address} /></div>
                            <p className='text-gray-500 text-sm py-4 text-justify italic mt-1'>{`${underMap[0]} ${posts[0]?.title} ${underMap[1]}` }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[30%] flex flex-col gap-5'>
                <BoxInfo userData={posts[0]?.user} />
                <RelatedPost />
                <RelatedPost newPost/>
            </div>
        </div>
    )
}

export default DetailPost