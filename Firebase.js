import { updateProfile, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
    addDoc,
    getDocs,
} from "firebase/firestore"; 
import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCt9YHjNGMBL1g9RYPkzEhPBVtn74991MQ",
    authDomain: "red-line-6577e.firebaseapp.com",
    projectId: "red-line-6577e",
    storageBucket: "red-line-6577e.appspot.com",
    messagingSenderId: "674959264736",
    appId: "1:674959264736:web:6aebdfd3527b42af7ab985",
    measurementId: "G-TT13ZH8Y4C"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export async function saveRide (company, model, year, engine, hp, miles) {

    console.log("Saving ride...");
    
    await setDoc(doc(db, "users", auth.currentUser.uid, "rides", company + model + year), {

        company: company,
        model: model,
        year: year,
        engine: engine,
        hp: hp,
        miles: miles,
        topSpeed: 0,
        uid: auth.currentUser.uid

    })
    .then(() => { console.log("Ride saved!"); })
    .catch((error) => { console.log("Error saving ride: " + error); });

}

export async function getRides () {

    const snapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "rides"));
    let rides = [];
    snapshot.forEach((doc) => { rides.push(doc.data()); });
    return rides;

}

export async function setCurrentRide (car) {

    console.log("Saving current ride...");

    await setDoc(doc(db, "users", auth.currentUser.uid, "info", "personal"), {

        email: auth.currentUser.email,
        username: auth.currentUser.displayName,
        uid: auth.currentUser.uid,

        currentRide: {
            company: car.company,
            engine: car.engine,
            hp: car.hp,
            miles: car.miles,
            model: car.model,
            topSpeed: car.topSpeed,
            uid: car.uid,
            year: car.year
        }

    })
    .then(() => { console.log("Current ride saved!"); })
    .catch((error) => { console.log("Error saving current ride: " + error); });
    
}

export async function saveUser (username, email, ride) {

    console.log("Saving user...");

    await updateProfile(auth.currentUser, { displayName: username });
    
    await setDoc(doc(db, "users", auth.currentUser.uid, "info", "personal"), {

        username: username,
        email: email,
        uid: auth.currentUser.uid,
        currentRide: ride

    })
    .then(() => { console.log("User saved!"); })
    .catch((error) => { console.log("Error saving user: " + error); });

}

export async function getUser () {

    const docRef = doc(db, "users", auth.currentUser.uid, "info", "personal");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) { return docSnap.data(); }

    else { return null; }

}

export async function saveUserImage (image) {

    console.log("Saving user image...");    

    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, "users/pfp/" + auth.currentUser.uid);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on("state_changed",
    (snapshot) => {},
    (error) => { alert(error); },
    () => { getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { return downloadURL; }); });

}

export async function getUserImage (name) {

    const storageRef = ref(storage, "users/pfp/" + name);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;

}

export async function savePostImage (image, name) {

    console.log("Saving post image...");

    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, "feed/" + name);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on("state_changed",
    (snapshot) => {},
    (error) => { alert(error); },
    () => { getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { return downloadURL; }); });

}

export async function savePost (title, caption, description) {

    console.log("Saving post...");

    await addDoc(collection(db, "feed"), {

        title: title,
        caption: caption,
        description: description,
        timestamp: Date.now()

    })
    .then(() => { console.log("Post saved!"); })
    .catch((error) => { console.log("Error saving post: " + error); });

}

export async function getPosts () {

    let postsData = [];
    const querySnapshot = await getDocs(collection(db, "feed"));

    querySnapshot.forEach((doc) => { postsData.push(doc.data()); });

    return postsData;

}

export async function saveJourney (journey, ride) {

    console.log("Saving journey...");

    await addDoc(collection(db, "users", auth.currentUser.uid, "journeys"), {

        journey: journey,
        timestamp: Date.now(),
        ride: ride

    })
    .then(() => { console.log("Journey saved!"); })
    .catch((error) => { console.log("Error saving journey: " + error); });

}

export async function getJourneys () {

    let journeysData = [];
    const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "journeys"));

    querySnapshot.forEach((doc) => { journeysData.push(doc.data()); });

    return journeysData;

}

export async function saveRideImage (image, name) {

    console.log("Saving ride image...");   
        
    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, "users/rides/" + name + auth.currentUser.uid);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on("state_changed",
    (snapshot) => {},
    (error) => { alert(error); console.log(error); },
    () => { getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { return downloadURL; }); }); 

    // const metadata = { contentType: "image/jpeg" };
    // await uploadBytes(ref(storage, "users/rides/" + name + auth.currentUser.uid), image, metadata)
    // .then(() => { console.log("Ride image saved!"); })
    // .catch((error) => { console.log("Error saving journey image: " + error); });

}

export async function getRideImage (name) {

    const storageRef = ref(storage, "users/rides/" + name + auth.currentUser.uid);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;

}