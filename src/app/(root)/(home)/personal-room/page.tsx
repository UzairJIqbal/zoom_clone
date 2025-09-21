/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

'use client'
import { Button } from '@/components/ui/button'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamVideoClient, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const Table = ({ title, description }: { title: string, description: string }) => {
  return <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
}

const Page = () => {
  const router = useRouter()
  const { user } = useUser()
  const client = useStreamVideoClient()
  const meetingID = user?.id!
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}`
  const { call } = useGetCallById(meetingID)

  const startMeeting = async () => {
    if (!user || !client) return

    try {

      if (!call) {
        const newCall = client.call("default", meetingID)
        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString()
          }
        })
      }
      router.push(`/meeting/${meetingID}/personal=true`)
    } catch (error) {

    }
  }

  return (
    <div className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        Personal Meeting Room
      </h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingID} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startMeeting}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast(
              "Link Copied",
            );
          }}
        >
          Copy Invitation
        </Button>
      </div>

    </div>
  )
}

export default Page
