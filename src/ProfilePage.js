import { useState, useEffect} from 'react';
import firebase from './firebase.js';



const ProfilePage = () => {

    const currentUser = localStorage.getItem('username');
    const [userFromDB, setUserFromDB] = useState({});
    const [currentAvatar, setCurrentAvatar] = useState('annTakamaki');
    const [arrayOfAvatars, setArrayOfAvatars] = useState([]);
    const [currentRefKey, setCurrentRefKey] = useState('')

    useEffect (() => {
        const dbRef = firebase.database().ref('Users')
        const dbRef2= firebase.database().ref('Avatars')
    
        dbRef.on('value', (response) => {
            console.log(response.val())

            const data = response.val()

            for (let user in data) {
                // console.log(user)
                // console.log(data[user])
                console.log(data[user].username)
                console.log(currentUser)
                if (data[user].username === currentUser ){
                    

                    
                    //save ref key of user to use later to update data.
                    console.log(user)
                    setCurrentRefKey(user)

                    // grab object with user and set it in state variable
                    console.log(data[user])
                    setUserFromDB(data[user])

                    console.log(userFromDB)

                    // set avatarTitle into state variable
                    setCurrentAvatar(userFromDB.avatar)
                    console.log(currentAvatar)
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
            console.log(newArray)
            setArrayOfAvatars(newArray)
            console.log(arrayOfAvatars)
        })
    }, [])

    const handleImgClick = (avatar) => {
        setCurrentAvatar(avatar)
    }

    const handleUpdateAvatar = () => {
        const dbRef = firebase.database().ref('Users')
    }
    return(
        <>
            <div className='profilePage'>
                <div className='currentAvatarContainer'>
                    {/* <img src={require(`./assets/profilePicturesv2/${currentAvatar}.png`).default} alt="" /> */}
                    <h2>Current Avatar</h2>
                </div>

                <div className='avatarList'>
                    {arrayOfAvatars.map(array => {
                        return(
                            <>
                                {/* <div onClick={() => {handleImgClick(array.avatar)}} className='imgContainer' key={array.key}>
                                    <img src={require(`./assets/profilePicturesv2/${array.avatar}.png`).default} alt="" />
                                </div> */}
                            </>

                        )
                    })}
                </div>
                <div>
                    <button OnClick={handleUpdateAvatar}>Save Your Avatar Picture</button>
                </div>
            </div>
        </>
    )
}


export default ProfilePage