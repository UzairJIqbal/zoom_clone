import CallLists from '@/components/CallLists'
import React from 'react'

const page = () => {
  return (
    <div className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        Upcoming meetings
      </h1>
      <CallLists type="upcoming"/>
    </div>
  )
}

export default page
