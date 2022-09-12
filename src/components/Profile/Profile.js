import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../services/LocalStorageService'
import { useUserProfileQuery } from '../../services/userAuthApi'
import classes from './Profile.module.css'

const Profile = () => {
    const navigate = useNavigate()
    const { access_token } = getToken()
    const { data, isSuccess } = useUserProfileQuery(access_token)
    const [userData, setUserdata] = useState({})
    const [profileData, setProfileData] = useState({})

    useEffect(() => {
        if (data && isSuccess) {
            setUserdata(data.user)
            setProfileData(data.profile)
        }
    }, [data, isSuccess])
    return (
        <div className={classes.Container}>
            <div className={classes.detailsContainer}>
                <h3 className={classes.Title}>Personal Details</h3>
                <p>
                    <span className={classes.key}>Name</span>

                    <span className={classes.value}>{userData.name}</span>
                </p>
                <p>
                    <span className={classes.key}>Email</span>
                    <span className={classes.value}>{userData.email}</span>
                </p>
                <p>
                    <span className={classes.key}>Phone</span>
                    <span className={classes.value}>{userData.phone}</span>
                </p>

                <p>
                    <span className={classes.key}>National Identity</span>
                    <span className={classes.value}>{profileData.nid}</span>
                </p>

                <h3 className={classes.Title}>Professional Details</h3>

                <p>
                    <span className={classes.key}>Doctor ID</span>
                    <span>{profileData.did}</span>
                </p>

                <p>
                    <span className={classes.key}>BMDC Number</span>
                    <span className={classes.value}>{profileData.bmdc}</span>
                </p>

                <p>
                    <span className={classes.key}>Qualification</span>
                    <span>{profileData.qualification}</span>
                </p>
                <p>
                    <span className={classes.key}>Speciality</span>
                    <span>{profileData.speciality}</span>
                </p>

                <p>
                    <span className={classes.key}>District</span>
                    <span>{profileData.district}</span>
                </p>
            </div>
        </div>
    )
}

export default Profile
