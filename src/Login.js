import {useState} from 'react';
import firebase from './firebase.js';

const Login = (prop) => {
    const [userUsername, setUserUsername] = useState('')
    const [userPassword, setUserPassword] = useState('')
    
    const [error, setError] = useState('')
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('username'))

    const handleUsernameChange = (e) => {
        setUserUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()
        
        setError('')
        const dbRef = firebase.database().ref(`Users`)

        dbRef.on('value', (response)=> {
            
            // have to console.log currentUser so it is used or else netlify wont let me upload it. (i only needed the setter function)
            console.log(currentUser)
            
            const data = response.val()
            for(let object in data) {
                

                if (userUsername === data[object].username && userPassword === data[object].password) {
                    
                    localStorage.setItem('username', data[object].username)
                    
                    setCurrentUser(localStorage.getItem('username'))
                    return prop.setResetPage(true)
                }
            }
            return setError('username and password do not match')
        })
    }
    return(
        <>
        <div className='bodyFrontContainer homeBackground'>   
           {error && <h1>{error}</h1>}
            <form className='loginForm' action="" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input required id='username' type="text" value={userUsername} onChange={handleUsernameChange} />
                <label htmlFor="password">Password</label>
                <input required id='password' type='password' value={userPassword} onChange={handlePasswordChange}/>
                <button>Sign In</button>
            </form>
        </div>
        </>
    )
}

export default Login

