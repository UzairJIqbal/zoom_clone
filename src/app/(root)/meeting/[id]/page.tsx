'use client'

import Loader from "@/components/Loader"
import MeetingRoom from "@/components/MeetingRoom"
import MeetingSetup from "@/components/MeetingSetup"
import { useGetCallById } from "@/hooks/useGetCallById"
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import React, { useState } from "react"
import { useParams } from "next/navigation"

export default function Meeting() {
  const { id } = useParams() as { id: string }

  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { user, isLoaded } = useUser()
  const { call, iscallLoading } = useGetCallById(id)
  

  if (!isLoaded || iscallLoading || !call) return <Loader />


  return (
    <main>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete}/> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}
