import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../../services/LocalStorageService'
import { useScheduleSetMutation } from '../../../services/userAuthApi'
import classes from './ScheduleCreate.module.css'

const ScheduleCreate = () => {
    const navigate = useNavigate('/')
    const [msg, setMsg] = useState('')
    const { access_token } = getToken()
    const [scheduleSet] = useScheduleSetMutation()

    const handleSet = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            schedule_day: data.get('schedule_day'),
            start_time: data.get('start_time'),
            end_time: data.get('end_time'),
            avg_consulting_time: data.get('avg_consulting_time'),
        }
        const res = await scheduleSet({ actualData, access_token })
        if (res.data) {
            setMsg('Schedule created')
            navigate('/dash')
        }
    }

    return (
        <div className={classes.Container}>
            <form onSubmit={handleSet}>
                <div className={classes.sectionHeader}>Add a Schedule</div>
                <div className={classes.formWrap}>
                    <div className={classes.formGrid}>
                        <label>
                            Day
                            <select id="text" name="schedule_day">
                                <option value="null">-----</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                            </select>
                        </label>

                        <label>
                            Start Time
                            <input
                                type="time"
                                id="start_time"
                                name="start_time"
                                placeholder="Enter start time"
                                required
                            />
                        </label>

                        <label>
                            End Time
                            <input type="time" id="end_time" name="end_time" placeholder="Enter end time" required />
                        </label>

                        <label>
                            Average Consulting Time
                            <input
                                type="number"
                                id="avg_consulting_time"
                                name="avg_consulting_time"
                                placeholder="Average Consulting Time"
                                required
                            />
                        </label>
                    </div>
                </div>
                <button className={classes.Button}>Add</button>
                <div className={classes.alertMessage}>{msg && <span>{msg}</span>}</div>
            </form>
            <span
                onClick={() => {
                    navigate('/dash')
                }}>
                View Schedules
            </span>
        </div>
    )
}

export default ScheduleCreate
