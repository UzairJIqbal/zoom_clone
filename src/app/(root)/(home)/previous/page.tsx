import CallLists from '@/components/CallLists'
import React from 'react'

const page = () => {
  return (
    <div className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        <CallLists type='ended'/>
      </h1>
    </div>
  )
}

export default page
