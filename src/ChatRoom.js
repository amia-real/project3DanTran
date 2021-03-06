import {useState, useEffect} from 'react';
import firebase from './firebase.js';
import MessageBox from './MessageBox.js';
import ProfilePage from './ProfilePage.js';


const CreateChatRoom = () => {
    // state variable to hold array of all available chat rooms from database
    const [chatRooms, setChatRooms] = useState([])

    // state variable to record the input of the create chat room input form
    const [userMessageChatRoom, setUserMessageChatRoom] = useState('')

    // state variable to control  whether we show the create chatroom form or not
    const [showChatRoom, setShowChatRoom] = useState(false)

    // state variable to control if we show the profile page or not
    const [avatarPage, setAvatarPage] = useState(false)

    //state variable to remember what chat room is selected
    const [selectedChatRoom, setSelectedChatRoom] = useState('general')

    // function to allow us to type in the create chat room input form
    const handleChangeChatRoom = (event) => {
        setUserMessageChatRoom(event.target.value)
    }
    // handles submitting of chat room creation input form
    const handleSubmitChatRoom = (event) => {
        event.preventDefault()
        // go into database
        const dbRef = firebase.database().ref('listOfChatRooms')

        dbRef.on('value', (response) => {
            console.log(response.val())
            const data = response.val()

            for (let chatRoomName in data) {
                console.log(data[chatRoomName])
                // make sure the inputted chat room name doesn't already exist
                if(userMessageChatRoom.toLowerCase().trim() === data[chatRoomName].toLowerCase().trim() ) {

                    // need to add error handling right here !!!!!!!
                    console.log('This chat room already exists')
                    setUserMessageChatRoom('')
                    return
                }
            }
            // add chat room to database
            dbRef.push(userMessageChatRoom)

            // gets rid of previous input
            setUserMessageChatRoom('')

            //closes the chat creation form
            setShowChatRoom(false)

            
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

    // function to change the chat room on click
    const changeChatRoom = (stuff) => {
        console.log('hi')
        console.log(stuff.nameOfChatRoom)
        setSelectedChatRoom(stuff.nameOfChatRoom)
        setAvatarPage(false)
    }

    // function to show chat room creation form on click
    const handleSubmitShowChatRoom = () => {
        setShowChatRoom(!showChatRoom)
    }
    
    // function to show profile page on click
    const handleAvatarClick = () => {
      setAvatarPage(true)
      
    }
       

    return(
        <div className='bodyContainer'>
            <section className='sideBar'>
                <div className='sideBarText'>
                    <i  onClick={handleAvatarClick} className="fas fa-user-circle"></i>
                    <div className="addingChatRooms" onClick = {handleSubmitShowChatRoom}>
                        <h2>CHAT ROOMS</h2>
                        {showChatRoom === false ?<i className="fas fa-plus"></i> : <i className="fas fa-minus"></i>}
                    </div>
                        {showChatRoom === true
                        ? <>
                        <form action="" onSubmit={handleSubmitChatRoom}>
                            <label className='sr-only' htmlFor="newMessage">Create a new chatRoom</label>
                            <input id='newMessage' type="text" value={userMessageChatRoom} onChange={handleChangeChatRoom} />
                            <button>Create Chatroom</button>
                        </form>
                        </>
                        : null}
                    
                    
                    <ul>
                        {
                            chatRooms.map((chatRoom) => {
                                return(
                                    <li key={chatRoom.key}>
                                        {/* <p>{chatRoom.nameOfChatRoom}</p> */}
                                        <button onClick={() => {changeChatRoom(chatRoom)}}>{chatRoom.nameOfChatRoom.toUpperCase()}</button>
                                    </li>
                                )
                            })
}
                    </ul>
                    
                </div>


                <footer>
                    <p>Created at </p>
                    <p>Juno College 2021</p>
                </footer>
            </section>
            {avatarPage === false ? <MessageBox chatRoom = {selectedChatRoom}/> : <ProfilePage/> }
        </div>


    )
}

export default CreateChatRoom;