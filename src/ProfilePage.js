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
            console.log(response.val())

            const data = response.val()

            for (let user in data) {
                
                console.log(data[user].username)
                console.log(currentUser)
                if (data[user].username === currentUser ){
                    

                    
                    
                    
                    // grab object with user and set it in state variable
                    console.log(data[user])

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

    const handleImgClick = (avatar) => {
        console.log(avatar)
        setCurrentAvatar(avatar)
    }

    const handleUpdateAvatar = (updatedAvatar) => {
        
        console.log(updatedAvatar)
        firebase.database().ref(`Users/${userFromDB.id}`).update({avatar: updatedAvatar})

        
    }
    
    return(
        <>
            <div className='profilePage'>
                <div className='currentAvatarContainer'>
                    <img src={require(`./assets/profilePicturesv2/${currentAvatar}.png`).default} alt={currentAvatar} />
                </div>
                <button onClick={() => handleUpdateAvatar(currentAvatar)}>Save Your Avatar Picture</button>

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