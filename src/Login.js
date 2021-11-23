import {useState} from 'react';
import firebase from './firebase.js';

const Login = (prop) => {
    const [userUsername, setUserUsername] = useState('')
    const [userPassword, setUserPassword] = useState('')
    // const [loading, setLoading] = useState(false)
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
            console.log(response.val())
            
            const data = response.val()
            for(let object in data) {
                console.log(object)
                console.log(data)
                console.log(data[object])
                console.log(data[object].username)

                if (userUsername === data[object].username && userPassword === data[object].password) {
                    console.log('successfully signed in')
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
           <h1> You are currently logged in as {currentUser}  </h1>
           {error && <h1>{error}</h1>}
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input required id='username' type="text" value={userUsername} onChange={handleUsernameChange} />
                <label htmlFor="password">Password</label>
                <input required id='password' type='password' value={userPassword} onChange={handlePasswordChange}/>
                <button>Sign In</button>
            </form>
        </>
    )
}

export default Login

// Right Now, when I log in, it doesnt rerender the messages accordingly..