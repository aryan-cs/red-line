import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyCt9YHjNGMBL1g9RYPkzEhPBVtn74991MQ",
    authDomain: "red-line-6577e.firebaseapp.com",
    projectId: "red-line-6577e",
    storageBucket: "red-line-6577e.appspot.com",
    messagingSenderId: "674959264736",
    appId: "1:674959264736:web:6aebdfd3527b42af7ab985",
    measurementId: "G-TT13ZH8Y4C"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const FIREBASE = {

    app: app,
    db: db,
    auth: auth,
    userID: auth.currentUser.uid,

}

export async function saveRide (company, model, year, color, engine, hp, miles) {

    console.log("Saving ride...");
    
    await setDoc(doc(db, "users", FIREBASE.userID, "rides", company + model + year), {

        company: company,
        model: model,
        year: year,
        color: color,
        engine: engine,
        hp: hp,
        miles: miles

    })
    .then(() => { console.log("Ride saved!"); })
    .catch((error) => { console.log("Error saving ride: " + error); });

    // set(ref(db, 'users/' + DATABASE.userID + "/rides/" + company + model + year), {

    //     company: company,
    //     model: model,
    //     year: year,
    //     color: color,
    //     engine: engine,
    //     hp: hp,
    //     miles: miles

    // })
    // .then(() => { console.log("Ride saved!"); })
    // .catch((error) => { console.log("Error saving ride: " + error); });

}
