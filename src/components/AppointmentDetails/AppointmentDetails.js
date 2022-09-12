import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken } from '../../services/LocalStorageService'
import { useMakeCommentMutation } from '../../services/userAuthApi'
import classes from './AppointmentDetails.module.css'

const AppointmentDetails = () => {
    const location = useLocation()
    const navigate = useNavigate('/')

    const { access_token } = getToken()
    const api = 'http://127.0.0.1:8000/api/patient'
    const patientId = location.state.patient_id
    const scheduleId = location.state.schedule_id
    const appointmentId = location.state.appointment_id

    const [patient, setPatient] = useState('')
    const [day, setDay] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const [msg, setMsg] = useState('')
    const [commentOnAppointment] = useMakeCommentMutation()
    const handleComment = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            doctor_comment: data.get('doctor_comment'),
        }
        const res = await commentOnAppointment({ appointmentId, actualData, access_token })
        if (res.error) {
            setMsg(`${res.error.data.errors.message}. ${res.error.data.errors.reason}`)
        } else if (res.data) {
            setMsg(`${res.data.message}`)
            navigate('/dash')
        }
    }

    useEffect(() => {
        const fetchPatient = async () => {
            const response = await fetch(`${api}/doctor-profile/${patientId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            })
            const data = await response.json()
            setPatient(data.user.name)
        }

        const fetchSchedule = async () => {
            const response = await fetch(`${api}/doctor-schedule-details/?schedule_id=${scheduleId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            })
            const data = await response.json()
            setStart(data[0].start_time)
            setEnd(data[0].end_time)
            setDay(data[0].schedule_day)
        }

        try {
            fetchPatient()
            fetchSchedule()
        } catch (e) {}
    }, [api, access_token, scheduleId, patientId, msg])

    return (
        <div className={classes.Container}>
            <div className={classes.Menu}>
                <button
                    onClick={() => {
                        navigate('/dash')
                    }}>
                    <span>{'<<<'} Back to Dashboard</span>
                </button>
            </div>
            <div className={classes.detailsContainer}>
                <h3 className={classes.Title}>Appointment Details</h3>
                <p>
                    <span className={classes.key}>Appointment ID </span>
                    <span className={classes.value}>{location.state.appointment_id}</span>
                </p>
                <p>
                    <span className={classes.key}>Date: </span>
                    <span className={classes.value}>{location.state.appointment_date}</span>
                </p>
                <p>
                    <span className={classes.key}>Day </span>
                    <span className={classes.value}>{day}</span>
                </p>

                <p>
                    <span className={classes.key}>Time </span>
                    <span className={classes.value}>
                        {start} - {end}
                    </span>
                </p>

                <p>
                    <span className={classes.key}>Appointed Patient/ID </span>
                    <span>{patient ? `${patient}` : `${location.state.patient_id}`} </span>
                </p>

                <p>
                    <span className={classes.key}>Reason for the appointment</span>
                    <span className={classes.value}>{location.state.reason}</span>
                </p>
                <p>
                    <span className={classes.key}>Appointment confirmation status</span>
                    <span className={location.state.appointment_status ? `${classes.yes}` : `${classes.no}`}>
                        {location.state.appointment_status ? 'Confirmed' : 'Not Confirmed'}
                    </span>
                </p>

                <p>
                    <span className={classes.key}>Appointment payment status</span>
                    <span className={location.state.payment_status ? `${classes.yes}` : `${classes.no}`}>
                        {location.state.payment_status ? 'Done' : 'Pending'}
                    </span>
                </p>

                <p>
                    <span className={classes.key}>Appointment completion status</span>
                    <span className={location.state.is_completed ? `${classes.yes}` : `${classes.no}`}>
                        {location.state.is_completed ? 'Completed' : 'Incomplete'}
                    </span>
                </p>

                <p>
                    <span className={classes.key}>Doctor Comment</span>
                    <span className={classes.value}>
                        {location.state.doctor_comment === null ? 'No comment' : `${location.state.doctor_comment}`}
                    </span>
                </p>

                <form onSubmit={handleComment}>
                    <div className={classes.sectionHeader}>Make comment on this appointment</div>
                    <div className={classes.formWrap}>
                        <div className={classes.formGrid}>
                            <label>
                                <input
                                    type="textbox"
                                    id="doctor_comment"
                                    name="doctor_comment"
                                    placeholder="Leave a comment for the patient"
                                />
                            </label>
                        </div>
                    </div>
                    <button className={classes.Button}>Comment</button>
                    <div className={classes.alertMessage}>{msg && <span>{msg}</span>}</div>
                </form>
            </div>
        </div>
    )
}

export default AppointmentDetails
