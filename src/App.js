import './App.css'
import {useState} from 'react';

import CreateChatRoom from './ChatRoom.js';
import SignUp from './Users.js';
import Login from './Login.js';



function App() {
    // state variable to send to child components 
    const [resetPage, setResetPage] = useState(false)

    //State variable to control if showing login or sign up page
    const [whichLoginPage, setWhichLoginPage] = useState('')
    
    // function to handle log-out onclick event
    const handleLogOut = (e) => {
      e.preventDefault()
      localStorage.removeItem('username')
      setResetPage(false)
      setWhichLoginPage('')
    }
    
    // function to handle log-in onclick event
    const handleLogIn = (e) => {
      e.preventDefault()
      setWhichLoginPage('Log In Page')
    }
    // function to handle signup onclick event
    const handleSignIn = (e) => {
      e.preventDefault()
      setWhichLoginPage('Sign In Page')
    }
    
   
    return (
      
      <div className="App">

        <header>
            <nav>
              <h1>PERSONA MESSENGER</h1>
              {!localStorage.getItem('username')
              ? <div className='loginButtonContainer'>
                <button onClick={handleLogIn}>Log In</button>
                <button onClick={handleSignIn}>Sign Up</button>
              </div>
              : <div className='loginButtonContainer'>
                
                <button onClick={handleLogOut}>Log Out</button>
                </div>
              }
            </nav>
        </header>
        
        {!localStorage.getItem('username') && whichLoginPage === 'Log In Page'
        ? <Login setResetPage = {setResetPage}/>
           
        
        : !localStorage.getItem('username') && whichLoginPage === 'Sign In Page'
        ? <SignUp setResetPage = {setResetPage}/>
        : localStorage.getItem('username') && <CreateChatRoom/>
        
        // : <>
        //     <h2>Welcome To persona Messenger. Please Login or Sign up to use the Application!</h2>
        //   </>
        }
        {resetPage === false && whichLoginPage === '' && (
        <div className='homeBackground'>
          <h2>Welcome To persona Messenger. Please Login or Sign up to use the Application!</h2>
        </div>
          )}
        
        
      </div>
    );


}

export default App;


// To do
// Create the form maybe in another component so the person can send a message.

// Another component for switching between chat rooms and displaying all of them on the right

// Make some sort of authentication so when populating the messages, we check who sent and what order

// once authentication is done, try to make it so people can add to chat room and only those chat rooms ur in will appear on your side bar
//but you can still go through all public chat r ooms and add yourself to it.
// maybe also have the person who created a chat room be able to remove people from it