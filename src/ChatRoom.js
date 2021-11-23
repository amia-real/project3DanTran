import {useState, useEffect} from 'react';
import firebase from './firebase.js';
import MessageBox from './MessageBox.js';
import App from './App.js';

const CreateChatRoom = () => {
    const [chatRooms, setChatRooms] = useState([])
    const [userMessageChatRoom, setUserMessageChatRoom] = useState('')
    
    const handleChangeChatRoom = (event) => {
        setUserMessageChatRoom(event.target.value)
    }

    const handleSubmitChatRoom = (event) => {
        event.preventDefault()

        const dbRef = firebase.database().ref('listOfChatRooms')

        dbRef.on('value', (response) => {
            console.log(response.val())
            const data = response.val()

            for (let chatRoomName in data) {
                console.log(data[chatRoomName])
                // for some reason the console log goes multiple times makes 
                if(userMessageChatRoom.toLowerCase().trim() === data[chatRoomName].toLowerCase().trim() ) {
                    console.log('This chat room already exists')
                    setUserMessageChatRoom('')
                    return
                }
            }
            
            dbRef.push(userMessageChatRoom)
            setUserMessageChatRoom('')

            // if (userMessageChatRoom)
        })

       
    }
    
    
    
    // display list of chat rooms when component is loaded
    useEffect (() => {
        const dbRef = firebase.database().ref('listOfChatRooms')

        dbRef.on('value', (response) => {
            const listOfChatRooms = []
            const data = response.val()

            for ( let chatRoom in data) {
                
                listOfChatRooms.push({
                    key: chatRoom,
                    nameOfChatRoom: data[chatRoom]

                })
            }
            setChatRooms(listOfChatRooms)
        })
    },[])

    const [selectedChatRoom, setSelectedChatRoom] = useState('general')
    const changeChatRoom = (stuff) => {
        console.log('hi')
        console.log(stuff.nameOfChatRoom)
        setSelectedChatRoom(stuff.nameOfChatRoom)
    }

    return(
        <div className='bodyContainer'>
            <section className='sideBar'>
                <h2>Your Chat Rooms</h2>
                <ul>
                    {
                        chatRooms.map((chatRoom) => {
                            return(
                                <li key={chatRoom.key}>
                                    {/* <p>{chatRoom.nameOfChatRoom}</p> */}
                                    <button onClick={() => {changeChatRoom(chatRoom)}}>{chatRoom.nameOfChatRoom}</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <form action="" onSubmit={handleSubmitChatRoom}>
                    <label htmlFor="newMessage">Create a new chatRoom</label>
                    <input id='newMessage' type="text" value={userMessageChatRoom} onChange={handleChangeChatRoom} />
                    <button>Send Message</button>
                </form>
            </section>


            <MessageBox chatRoom = {selectedChatRoom}/>
        </div>


    )
}

export default CreateChatRoom;