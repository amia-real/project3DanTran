

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

        
        
        const messageObject = {}
        
        messageObject.user = localStorage.getItem('username')

        // grabbing information for the date
        const d = new Date()
        // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // messageObject.time = d.getTime()

        messageObject.date = d.getDate()
        messageObject.year = d.getFullYear()
        messageObject.month = d.getMonth() + 1
        messageObject.timeAndDate = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});

        // finally, grab their message
        messageObject.message = userMessage

        dbRef.push(messageObject)
        setUserMessage('');


    }
   
    useEffect(() => {
        // reference 2 different parts of the fire base database
        const dbRef = firebase.database().ref(`chatrooms/${prop.chatRoom}`)
        const dbRef2 = firebase.database().ref('Users')

        // grab the user object in the database and store each user and their avatar to an array
        dbRef2.on('value', (response) => {
            

            const data = response.val()
            const newArray = []
            for (let user in data) {
                const newObj = {
                    user : data[user].username,
                    avatar: data[user].avatar
                }
                
                newArray.push(newObj)
                
            }
            // do another call of the database inside the first one to grab the list of messages pertaining to the selected chatroom
            dbRef.on('value', (response) => {
                
                const messageHistory = []
                const data = response.val()
                // nested forloop between the 2 arrays to add the avatar to each message object that corresponds to the person who wrote the message
                for (let message in data) {
                    for (let i = 0; i < newArray.length; i++){
                        if (data[message].user === newArray[i].user){
                            data[message].avatar = newArray[i].avatar
                        }
                    }
                    data[message].key = message
                    
                    messageHistory.push(data[message])
                }
                setRenderMessages(messageHistory)
            })
            
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
                <div className='startImageContainer'>
                    <img src={require(`./assets/jokerStart.png`).default} alt="Joker from persona5" />
                </div>
                <h2>THIS IS BUT THE START OF THE CONVERSATION. TYPE SOMETHING!</h2>
                    {
                        renderMessages.map((message) => {
                            // findAvatarForImage(message.user)
                            // {message.user === currentUser ? return(hi) : return(bye)}  
                            return message.user === currentUser ? (
                                
                                <div key={message.key} className='messageBody2'>                                  
                                    <div className='messageContainer2'>
                                        <div className='dateAndTime2'> {message.timeAndDate} - {message.month}/{message.date}/{message.year}</div>
                                        <div className='frontPart2'>
                                            <div className="insideFrontPart2"> 
                                                <p> {message.message}</p>
                                                {/* <p>{message.day}, {message.month} {message.date}th, {message.year}</p> */}
                                            </div>
                                        </div>
                                    </div>                                      
                                </div>
                            )

                                : (     <div key = {message.key} className="messageBody">
                                            <div className='profileImageContainer'>
                                                
                                                <p className='nameCard'>{message.user}</p>
                                                <img src={require(`./assets/profilePicturesv2/${message.avatar}.png`).default} alt="" />
                                                
                                                
                                            </div>
                                            <div className='messageContainer'>
                                                {message.message.includes('!') && !message.message.includes('?') && <img className='exclamationImg' src={exclamation} alt="" />}
                                                {message.message.includes('?') && !message.message.includes('!') && <img className='exclamationImg' src={question} alt=''/>}
                                                {message.message.includes('?') && message.message.includes('!') && <img className='exclamationImg' src={question2} alt=''/>}
                                                
                                                <div className='dateAndTime'> {message.timeAndDate} - {message.month}/{message.date}/{message.year}</div>
                                                <div className='frontPart'>
                                                    
                                                    <div className="insideFrontPart">
                                                        <p> {message.message}</p>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                        })
                    }
                <div ref={messagesEndRef}></div>
            </div>
                <form className='sendMessage' action="" onSubmit={handleSubmit}>
                    <label className='sr-only' htmlFor="newMessage">Send a new Message</label>
                    <input id='newMessage' type="text" value={userMessage} onChange={handleChange} required />
                    <button className='messageButton'>Send Message</button>
                </form>
        </div>
    )
}
export default MessageBox