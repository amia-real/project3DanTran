import { useState, useEffect} from 'react';
import firebase from './firebase.js';



const ProfilePage = () => {

    
    const [userFromDB, setUserFromDB] = useState({});
    const [currentAvatar, setCurrentAvatar] = useState('annTakamaki');
    const [arrayOfAvatars, setArrayOfAvatars] = useState([]);
    

    useEffect (() => {
        const dbRef = firebase.database().ref('Users')
        const dbRef2= firebase.database().ref('Avatars')
        const currentUser = localStorage.getItem('username');
        dbRef.on('value', (response) => {
            

            const data = response.val()

            for (let user in data) {
                
                
                if (data[user].username === currentUser ){
                    

                    
                    
                    
                    // grab object with user and set it in state variable

                    const newObj = {
                        ...data[user],
                        id: user
                       }


                    setUserFromDB(newObj)

                    

                    // set avatarTitle into state variable
                    setCurrentAvatar(data[user].avatar)
                    
                }
            }
        })
        // grabs a list of all the avatars from our db
        dbRef2.on('value', (response) => {
            const data = response.val()
            const newArray = []
            for (let avatar in data) {
                newArray.push({key: avatar,
                    avatar: data[avatar]})

                
            }
            
            setArrayOfAvatars(newArray)
            
        })
    }, [])
    // function when an avatar image is clicked on in the grid
    const handleImgClick = (avatar) => {
        
        setCurrentAvatar(avatar)
    }
    // updates the avatar to firebase once saved
    const handleUpdateAvatar = (updatedAvatar) => {
        
        
        firebase.database().ref(`Users/${userFromDB.id}`).update({avatar: updatedAvatar})

        
    }
    
    return(
        <>
            <div className='profilePage'>
                <div className='currentAvatarContainer'>
                    <img src={require(`./assets/profilePicturesv2/${currentAvatar}.png`).default} alt={currentAvatar} />
                </div>
                <button className='messageButton' onClick={() => handleUpdateAvatar(currentAvatar)}>Save Your Avatar Picture</button>

                <div className='avatarList'>
                    {arrayOfAvatars.map(array => {
                        return(
                            <>
                                <div onClick={() => {handleImgClick(array.avatar)}} className='imgContainer' key={array.key}>
                                    <img src={require(`./assets/profilePicturesv2/${array.avatar}.png`).default} alt={array.avatar} />
                                </div>
                            </>

                        )
                    })}
                </div>
                
            </div>
        </>
    )
}


export default ProfilePage