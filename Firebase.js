import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
    addDoc,
    getDocs } from "firebase/firestore"; 
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

export async function saveRide (company, model, year, color, engine, hp, miles) {

    console.log("Saving ride...");
    
    await setDoc(doc(db, "users", auth.currentUser.uid, "rides", company + model + year), {

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

}

export async function getRides () {

    const docRef = doc(db, "users", auth.currentUser.uid, "rides");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) { return docSnap.data(); }

    else { return null; }

}

export async function saveUser (username, email, password) {

    console.log("Saving user...");
    
    await setDoc(doc(db, "users", auth.currentUser.uid, "info", "personal"), {

        username: username,
        email: email,
        password: password,
        uid: auth.currentUser.uid

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

export async function saveUserImage (image, name) {

    console.log("Saving user image...");    

    const storageRef = ref(storage, "users/images/" + name);
    const uploadTask = uploadBytesResumable(storageRef, image, { contentType: "image/jpg" });

    uploadTask.on("state_changed", (snapshot) => {}, (error) => {

        console.log("Error saving user image: " + error);

    }, () => {

        console.log("User image saved!");

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            console.log('File available at', downloadURL);

        });

    });

}

export async function getUserImage (name) {

    const storageRef = ref(storage, "users/images/" + name);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;

}

export async function savePost (title, caption, imagePath, cords, description) {

    console.log("Saving post...");

    if (cords == null || cords == undefined) { cords = ""; }
    if (imagePath == null || imagePath == undefined) { imagePath = ""; }

    await addDoc(collection(db, "feed"), {

        title: title,
        caption: caption,
        imagePath: imagePath,
        cords: cords,
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

export async function saveJourney (journey) {

    console.log("Saving journey...");

    await addDoc(collection(db, "users", auth.currentUser.uid, "journeys"), {

        journey: journey,
        timestamp: Date.now()

    })
    .then(() => { console.log("Journey saved!"); })
    .catch((error) => { console.log("Error saving journey: " + error); });

}