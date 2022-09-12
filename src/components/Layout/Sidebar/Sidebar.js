import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import doc1 from '../../../assets/images/doc1.jpg'
import { unsetUserToken } from '../../../features/authSlice'
import { removeToken, getToken } from '../../../services/LocalStorageService'
import { useUserProfileQuery } from '../../../services/userAuthApi'
import classes from './Sidebar.module.css'

const Sidebar = () => {
    const navigate = useNavigate('/')
    const location = useLocation()
    const [userData, setUserdata] = useState({})
    const [profileData, setProfileData] = useState({})
    const [designation, setDesignation] = useState('')
    const { access_token } = getToken()
    const { data, isSuccess } = useUserProfileQuery(access_token)
    const dispatch = useDispatch()

    useEffect(() => {
        if (data && isSuccess) {
            setUserdata(data.user)
            setProfileData(data.profile)
            setDesignation(userData.role_id)
        }
    }, [data, isSuccess, userData.role_id])

    const handleLogout = () => {
        dispatch(unsetUserToken({ access_token: null }))
        removeToken()
        navigate('/auth')
    }

    return (
        <div className={classes.Bar}>
            <div className={classes.profilecard}>
                <h2>DoctorKhana</h2>
                <div className={classes.Content}>
                    <div className={classes.profileImg}>
                        <img src={doc1} alt="pp" />
                    </div>

                    <div className={classes.Intro}>
                        <div className={classes.Name}>{userData.name}</div>
                        <div className={classes.Designation}>{designation}</div>
                    </div>
                </div>
            </div>

            <ul className={classes.Menus}>
                <li className={location.pathname === '/dash' ? classes.active : ''}>
                    <Link to="/dash">Dashboard</Link>
                </li>
                <li className={location.pathname === '/profile' ? classes.active : ''}>
                    <Link to="/profile">profile</Link>
                </li>
                <li className={location.pathname === '/settings' ? classes.active : ''}>
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>

            <div className={classes.Logout}>
                <button onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}
export default Sidebar
