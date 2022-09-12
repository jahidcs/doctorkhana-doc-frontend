import React from 'react'
import { Link } from 'react-router-dom'
import classes from './LandingPage.module.css'

const LandingPage = () => {
    return (
        <div className={classes.landingContainer}>
            <div className={classes.landingCard}>
                <h1>Welcome to DoctorKhana</h1>
            </div>
            <div className={classes.roleCard}>
                <div className={classes.Content}>
                    <div className={classes.title}>Use DoctorKhana as</div>
                    <div className={classes.Option}>
                        <span>
                            <a href="http://localhost:3002/">Patient</a>
                        </span>
                        <span>
                            <Link to="/auth">Doctor</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
