'use client'
import { useGetCall } from '@/hooks/useGetCall'
import React, { useEffect, useState } from 'react'
import MeetingCards from './MeetingCards'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CallLists = ({ type }: {
    type: 'ended' | 'upcoming' | 'recordings'
}) => {
    const router = useRouter()
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const {
        endedCalls,
        upcomingcalls,
        Callrecordings,
    } = useGetCall()



    const getCalls = () => {
        switch (type) {
            case 'upcoming':
                return upcomingcalls

            case 'ended':
                return endedCalls

            case "recordings":
                return recordings

            default:
                return []
        }
    }

    const getCallsErrors = () => {
        switch (type) {
            case 'upcoming':
                return "No Upcoming Calls"

            case 'ended':
                return "No ended Calls"

            case "recordings":
                return "No recording"

            default:
                return ''
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
           try {
             const callData = await Promise.all(
                Callrecordings?.map((call) => call.queryRecordings()) ?? []
            )
            const recordings = callData
                .filter((call) => call.recordings.length > 0)
                .flatMap((call) => call.recordings);

                setRecordings(recordings)
           } catch (error) {
            toast("Try again later")
           }
        }
        if (type === 'recordings') fetchRecordings()
       
    }, [type, Callrecordings])


    const calls = getCalls()
    const callsErrors = getCallsErrors()


    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? (
                calls.map((meeting: Call | CallRecording, index: number) => (
                    <MeetingCards
                        key={index}
                        icon={
                            type === "ended"
                                ? "/icons/previous.svg"
                                : type === "upcoming"
                                    ? "/icons/upcoming.svg"
                                    : "/icons/recordings.svg"
                        }
                        title={
                            (meeting as Call).state?.custom?.description?.substring(0, 30) ||
                            (meeting as CallRecording).filename?.substring(0, 30) ||
                            ""
                        }
                        date={
                            (meeting as Call).state?.startsAt?.toLocaleString?.() ||
                            (meeting as CallRecording).start_time?.toLocaleString?.() ||
                            ""
                        }
                        buttonText={type === "recordings" ? "Play" : "Start"}
                        buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
                        isPreviousMeeting={type === "ended"}
                        link={
                            type === "recordings"
                                ? (meeting as CallRecording).url
                                : `/meeting/${(meeting as Call).id}`
                        }
                        handleClick={
                            type === "recordings"
                                ? () => router.push(`${(meeting as CallRecording).url}`)
                                : () => router.push(`/meeting/${(meeting as Call).id}`)
                        }
                    />
                ))
            ) : (
                <h1 className="text-2xl font-bold text-white">{callsErrors}</h1>
            )}
        </div>
    )
}

export default CallLists
