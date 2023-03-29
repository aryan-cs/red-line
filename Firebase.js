import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

export async function saveImage (image, name) {

    const storageRef = ref(storage, "images/" + name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on("state_changed", (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

    }, (error) => {

        console.log("Error uploading image: " + error);

    }, () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            console.log("Image uploaded successfully!");
            return downloadURL;

        });

    });

}

export async function getImage (name) {

    const storageRef = ref(storage, "images/" + name);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;

}

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