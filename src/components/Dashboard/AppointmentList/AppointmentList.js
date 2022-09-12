import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../../services/LocalStorageService'
import classes from './AppointmentList.module.css'

const AppointmentList = () => {
    const navigate = useNavigate('/')
    const { access_token } = getToken()
    const api = 'http://127.0.0.1:8000/api/doctor'

    const [appointments, setAppointments] = useState({})

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await fetch(`${api}/appointments`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            })
            const data = await response.json()
            setAppointments(data)
        }

        try {
            fetchAppointments()
        } catch (e) {}
    }, [api, access_token])
    let data = Array.from(appointments)
    console.log(data)
    return (
        <div className={classes.listContainer}>
            <h2>Appointments</h2>
            <table>
                {data.length === 0 ? (
                    <h3>No Schdule Added</h3>
                ) : (
                    <thead>
                        <tr>
                            <th>Apt. ID</th>
                            <th>Patient ID</th>
                            <th>Reason For Appointment</th>
                            <th>Status</th>
                            <th>View</th>
                        </tr>
                    </thead>
                )}
                <tbody>
                    {data.lenght === 0 ? (
                        'No Schedule Added'
                    ) : (
                        <>
                            {data.map((appointment, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{appointment.appointment_id}</td>
                                        <td>{appointment.pat_id}</td>
                                        <td>{appointment.reason}</td>
                                        <td className={appointment.is_completed ? `${classes.yes}` : `${classes.no}`}>
                                            {appointment.is_completed ? 'Completed' : 'Incomplete'}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    navigate(`/appointment-details/${appointment.appointment_id}`, {
                                                        state: appointment,
                                                    })
                                                }}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AppointmentList
