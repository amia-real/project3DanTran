import {useState} from 'react';
import firebase from './firebase.js';


const SignUp = (prop) => {
    //state variable for all the information needed when saving the user data
    const [userEmail, setUserEmail] = useState('')
    const [userUsername, setUserUsername] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userConfirmPassword, setUserConfirmPassword] = useState('')
    
    // variable for error handling
    const [error, setError] = useState('')
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('username'))
    
    // series of functions to handle typing on any of the inputs in the form
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
    // function when the form is submitted
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
       userObject.avatar = 'makotoNijima'

       dbRef.push(userObject)

       localStorage.setItem("username", userObject.username)
       setCurrentUser(localStorage.getItem('username'))
       
       // have to console.log currentUser so it is used or else netlify wont let me upload it. (i only needed the setter function)
       console.log(currentUser)
    
       return prop.setResetPage(true)
        
    }
    return(
        <>
            <div className='bodyFrontContainer homeBackground'>
           {error && <h1>{error}</h1>}
            <form className='loginForm' action="" onSubmit={handleSubmit}>
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
            </div>
        </>
    )
}

export default SignUp