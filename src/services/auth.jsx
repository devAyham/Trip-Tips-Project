import firebase from "../config/firebase-config"


const socialMediaAuth = (provider) =>{

return   firebase.auth().signInWithPopup(provider)
        .then((res)=>{
            // console.log(res.credential.accessToken);
            return res
        })
        .catch((er) =>{
            console.log(er);
            return er;
        })

}


export default socialMediaAuth ;