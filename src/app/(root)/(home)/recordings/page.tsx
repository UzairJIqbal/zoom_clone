import CallLists from '@/components/CallLists'
import Loader from '@/components/Loader'
import React from 'react'

const Page = () => {
  return (
    <div className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        <CallLists type='recordings'/>
      </h1>
    </div>
  )
}

export default Page