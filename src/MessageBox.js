

import { useState, useEffect, useRef } from 'react';
import firebase from './firebase.js';
import exclamation from './assets/exclamation.png'
import question from './assets/questionMark.png'
import question2 from './assets/questionMark2.png'

const MessageBox = function (prop) {
    
    const currentUser = localStorage.getItem('username');

    //state for user message
    const [userMessage, setUserMessage] = useState('')
    const messagesEndRef = useRef(null)


    // state variable to store the messages from db that need to be rendered on the page
    const [renderMessages, setRenderMessages] = useState([])

    // allows us to type in the message send input form
    const handleChange = (event) => {
        setUserMessage(event.target.value)
    }
    // controls the submission of the input form
    const handleSubmit = (event) => {
        event.preventDefault()

        const dbRef = firebase.database().ref(`chatrooms/${prop.chatRoom}`)

        console.log(dbRef)
        
        const messageObject = {}
        
        messageObject.user = localStorage.getItem('username')

        // grabbing information for the date
        const d = new Date()
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        messageObject.time = d.getTime()

        messageObject.day = days[d.getDay()]
        messageObject.date = d.getDate()
        messageObject.year = d.getFullYear()
        messageObject.month = months[d.getMonth()]

        // finally, grab their message
        messageObject.message = userMessage

        dbRef.push(messageObject)
        setUserMessage('');


    }
    // I want to display all of the chat logs belonging to a certain chat room
    useEffect(() => {
        const dbRef = firebase.database().ref(`chatrooms/${prop.chatRoom}`)



        dbRef.on('value', (response) => {
            console.log(response.val())
            const messageHistory = []
            const data = response.val()

            for (let message in data) {
                data[message].key = message
                console.log(message)
                console.log(data[message])
                messageHistory.push(data[message])
            }
            setRenderMessages(messageHistory)
        })


    }, [prop.chatRoom])
    const scrollToBottom = () => {
        
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    
    }
    //allows you to see the latest message first
    useEffect (() => {
        scrollToBottom()
    },[renderMessages])


    return (
        <div className = 'extraWrapper'>
            
            <div className='chatRoomName'>
                <h2> {prop.chatRoom.toUpperCase()} </h2>
            </div>
            <div className='messageContainerFull'>
                
                    {
                        renderMessages.map((message) => {

                            // {message.user === currentUser ? return(hi) : return(bye)}  
                            return message.user === currentUser ? (

                                <div key={message.key} className='messageBody2'>                                  
                                    <div className='messageContainer2'>
                                        <div className='frontPart2'>
                                            <div className="insideFrontPart2"> 
                                                <p> {message.message}</p>
                                                <p>{message.day}, {message.month} {message.date}th, {message.year}</p>
                                            </div>
                                        </div>
                                    </div>                                      
                                </div>
                            )

                                : (     <div key = {message.key} className="messageBody">
                                            <div className='profileImageContainer'>
                                                {/* <img src={testImage} alt=""/> */}

                                                <img src={require(`./assets/profilePicturesv2/annTakamaki.png`).default} alt="" />
                                                
                                                
                                            </div>
                                            <div className='messageContainer'>
                                                {message.message.includes('!') && !message.message.includes('?') && <img className='exclamationImg' src={exclamation} alt="" />}
                                                {message.message.includes('?') && !message.message.includes('!') && <img className='exclamationImg' src={question} alt=''/>}
                                                {message.message.includes('?') && message.message.includes('!') && <img className='exclamationImg' src={question2} alt=''/>}
                                                <div className='frontPart'>
                                                    <div className="insideFrontPart">
                                                        <p> {message.message}</p>
                                                        <p>{message.day}, {message.month} {message.date}th, {message.year}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                        })
                    }
                <div ref={messagesEndRef}></div>
            </div>
                <form className= 'sendMessage'action="" onSubmit={handleSubmit}>
                    <label className='sr-only' htmlFor="newMessage">Send a new Message</label>
                    <input id='newMessage' type="text" value={userMessage} onChange={handleChange} required />
                    <button>Send Message</button>
                </form>
        </div>
    )
}
export default MessageBox