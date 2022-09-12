import React from 'react'
import { useState } from 'react'
import ResetPassword from '../../pages/auth/PasswordReset'
import ScheduleCreate from './ScheduleCreate/ScheduleCreate'
import classes from './Settings.module.css'

const Settings = () => {
    const [menu, setMenu] = useState(1)

    return (
        <div className={classes.Container}>
            <div className={classes.Wrapper}>
                <div>
                    <div className={classes.Nav}>
                        <span
                            className={menu === 1 ? `${classes.activeNav}` : `${classes.deactiveNav}`}
                            onClick={(e) => setMenu(1)}>
                            Schedule
                        </span>

                        <span
                            className={menu === 2 ? `${classes.activeNav}` : `${classes.deactiveNav}`}
                            onClick={(e) => setMenu(2)}>
                            Change Password
                        </span>
                    </div>
                    <div>{menu === 1 ? <ScheduleCreate /> : null}</div>
                    <div>{menu === 2 ? <ResetPassword /> : null}</div>
                </div>
            </div>
        </div>
    )
}

export default Settings
