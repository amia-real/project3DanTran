
import { useState, useEffect } from 'react';
import firebase from './firebase.js';

const MessageBox = function (prop) {
    // just the message itself
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('username'))
    const [userMessage, setUserMessage] = useState('')

    // for the whole message object
    const [userMessageObject, setUserMessageObject] = useState({})

    const [renderMessages, setRenderMessages] = useState([])

    const handleChange = (event) => {
        setUserMessage(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const dbRef = firebase.database().ref(`chatrooms/${prop.chatRoom}`)
        // right now we are saving only the message, but I would like to also save
        // the chat room we are in, the user who submitted the message and the date
        console.log(dbRef)
        // console.log(firebase.database().ref('yohoho'))
        const messageObject = {}
        // will find away to get the user data later for now I set as Bob
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
    return (
        <div className = 'extraWrapper'>
        <div className='messageContainerFull'>
            
                {
                    renderMessages.map((message) => {

                        // {message.user === currentUser ? return(hi) : return(bye)}  
                        return message.user === currentUser ? (

                            <div key={message.key}>
                                <p>This is you {message.message}</p>
                                <p>{message.day}, {message.month} {message.date}th, {message.year}</p>
                            </div>
                        )

                            : (     <div key = {message.key} className="messageBody">
                                        <div className='profileImageContainer'>
                                            <img src="yoyoy.png" alt=""/>
                                        </div>
                                        <div className='messageContainer'>
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
            
            <h1> {prop.chatRoom} </h1>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="newMessage">Send a new Message</label>
                <input id='newMessage' type="text" value={userMessage} onChange={handleChange} required />
                <button>Send Message</button>
            </form>
        </div>
        </div>
    )
}
export default MessageBox