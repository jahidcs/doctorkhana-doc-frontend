import React from 'react'
import AppointmentList from './AppointmentList/AppointmentList'
import classes from './Dashboard.module.css'
import ScheduleList from './ScheduleList/ScheduleList'

const Dashboard = () => {
    return (
        <div className={classes.Container}>
            <div className={classes.Appointment}>
                <AppointmentList />
            </div>
            <div className={classes.Schedule}>
                <ScheduleList />
            </div>
        </div>
    )
}

export default Dashboard
