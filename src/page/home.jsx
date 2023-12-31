import React, { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import { useuserdatacontext } from '../service/context/usercontext';
import { auth } from '../service/Auth';
import { Popupitem } from '../ui/popup'
import { createnewpost, get_userdata, getallpost, getallprofile } from '../service/Auth/database';
import { Post } from '../ui/post';
import { Createpost } from '../component/createpost';
import Profileviewbox from '../component/profileviewbox';
import Suggestion from '../component/suggestion';
export const Home = () => {
  const [allpostdata, setallpostdata] = useState([])

  if (allpostdata == [null]) {
    return <></>
  }

  useEffect(() => {
    const dataforallpost = async () => {
      const allpost = await getallpost();
      setallpostdata(allpost)
    }
    dataforallpost()
  }, [])

  return (
    <div className='flex w-full justify-around h-screen '>
      <Navbar />
      <div className="flex border-gray-800 max-h-screen  overflow-y-scroll scroll-hidden  border-x-2  w-full mx-3 flex-col ">
        <div className="">
          <Createpost />
        </div>
        <hr className='border-gray-700 w-full' />
        <div className="">
          {allpostdata.map((postarray, index) => {
            return <>{postarray.map((post, index) => {
              return <div className="">
                <Post postdata={post} popup={true} />
              </div>
            })}</>
          })}
        </div>
      </div>
      <div className="w-1/4 hidden md:block">
      <Suggestion />
      </div>
    </div>
  )
}
