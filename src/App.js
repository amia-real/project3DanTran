import './App.css'
import {useState} from 'react';

import CreateChatRoom from './ChatRoom.js';
import SignUp from './Users.js';
import Login from './Login.js';

// New ERROR : find a way to rerender the page when someone logs in or creates a user so they can display the good stuff.

function App() {
    const [resetPage, setResetPage] = useState('')
    const [whichLoginPage, setWhichLoginPage] = useState('')
    const handleLogOut = (e) => {
      e.preventDefault()
      localStorage.removeItem('username')
      setResetPage('plz work brooo')
      setWhichLoginPage('')
    }
    
    // const pleaseAllowParentToReRender = () => {
    //   setResetPage('plz')
    // }
    // useEffect(() => {

    // })

    const handleLogIn = (e) => {
      e.preventDefault()
      setWhichLoginPage('Log In Page')
    }
    const handleSignIn = (e) => {
      e.preventDefault()
      setWhichLoginPage('Sign In Page')
    }
        
       
   
    return (
      
      <div className="App">

        <header>
            <nav>
              <h1>Persona Messenger</h1>
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
        
        : localStorage.getItem('username')
        ? <>
            {/* <header>
              <h1>Hello, {localStorage.getItem('username')}</h1>
              <button onClick={handleLogOut}>Log Out</button>
            </header> */}
            <CreateChatRoom/> 

          </>
        : <>
            <h2>Welcome To persona Messenger. Please Login or Sign up to use the Application!</h2>
          </>
        }
        
        
        {/* <SignUp/>
  
        <h2>Break to delineate</h2>
  
        <Login/>
        <h2>Another BREAK</h2> */}
        {/* <header>
          <button onClick={handleLogOut}>Log Out</button>
        </header>
        <CreateChatRoom/> */}
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