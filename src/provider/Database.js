import { getAuth, onAuthStateChanged } from "firebase/auth";

export var DATABASE = {

    // Firebase
    auth: getAuth(),
    onAuthStateChanged: onAuthStateChanged,
    userID: auth.uid,
    userEmail: auth.email,
    userDisplayName: auth.displayName,

};
