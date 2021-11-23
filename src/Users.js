import {useState} from 'react';
import firebase from './firebase.js';
// import { useAuth } from './AuthContext.js';

const SignUp = (prop) => {
    const [userEmail, setUserEmail] = useState('')
    const [userUsername, setUserUsername] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userConfirmPassword, setUserConfirmPassword] = useState('')
    // const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('username'))
    // const {signup} = useAuth()

    const handleUsernameChange = (e) => {
        setUserUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value)
    }
    const handleConfirmPasswordChange = (e) => {
        setUserConfirmPassword(e.target.value)
    }

    const handleUserEmailChange = (e) => {
        setUserEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        
        setError('')
        //Some error handling before it gets sent to firebase
        if (userPassword !== userConfirmPassword) {
            return setError('Passwords do not match')
        }

       const dbRef = firebase.database().ref(`Users`)

       const userObject = {}

       userObject.username = userUsername
       userObject.password = userPassword
       userObject.email = userEmail

       dbRef.push(userObject)

       localStorage.setItem("username", userObject.username)
       setCurrentUser(localStorage.getItem('username'))

       return prop.setResetPage('Please rerender')
        
    }
    return(
        <>
           <h1> You are currently logged in as {currentUser}  </h1>
           {error && <h1>{error}</h1>}
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input required id='email' type="email" value={userEmail} onChange={handleUserEmailChange} />
                <label htmlFor="username">Username</label>
                <input required id='username' type="text" value={userUsername} onChange={handleUsernameChange} />
                <label htmlFor="password">Password</label>
                <input required id='password' type='password' value={userPassword} onChange={handlePasswordChange}/>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input required id='confirmPassword' type='password' value={userConfirmPassword} onChange={handleConfirmPasswordChange}/>
                <button>Sign Up</button>
            </form>
        </>
    )
}

export default SignUp