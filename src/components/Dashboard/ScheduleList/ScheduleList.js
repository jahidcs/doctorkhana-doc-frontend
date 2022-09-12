import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../../services/LocalStorageService'
import classes from './ScheduleList.module.css'

const ScheduleList = () => {
    const navigate = useNavigate('/')
    const { access_token } = getToken()
    const api = 'http://127.0.0.1:8000/api/doctor'

    const [schedules, setSchedules] = useState({})

    useEffect(() => {
        const fetchSchedules = async () => {
            const response = await fetch(`${api}/schedule-list`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            })
            const data = await response.json()
            setSchedules(data)
        }

        try {
            fetchSchedules()
        } catch (e) {}
    }, [api, access_token])
    let data = Array.from(schedules)
    return (
        <div className={classes.listContainer}>
            <h2>Schedules</h2>
            <table>
                {data.length === 0 ? (
                    <h3>No Schdule Added</h3>
                ) : (
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Consultency duration</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                )}
                <tbody>
                    {data.lenght === 0 ? (
                        'No Schedule Added'
                    ) : (
                        <>
                            {data.map((schedule, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{schedule.schedule_day}</td>
                                        <td>{schedule.start_time}</td>
                                        <td>{schedule.end_time}</td>
                                        <td>{schedule.avg_consulting_time}</td>
                                        <td className={schedule.schedule_status ? `${classes.yes}` : `${classes.no}`}>
                                            {schedule.schedule_status ? 'Active' : 'Not Active'}
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                    )}
                </tbody>
            </table>
            <button
                onClick={() => {
                    navigate('/settings')
                }}>
                Add new Schedule
            </button>
        </div>
    )
}

export default ScheduleList
