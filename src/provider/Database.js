import { getAuth, onAuthStateChanged } from "firebase/auth";

export var DATABASE = {

    auth: getAuth(),
    onAuthStateChanged: onAuthStateChanged,
    userID: auth.uid,
    userEmail: auth.email,
    userDisplayName: auth.displayName,

};

export function saveDrive (drive) {

    var driveRef = database.ref(DATABASE.userID + "/drives/" + drive.id);
    driveRef.set(drive);

}

export function saveRide (company, model, year, color, engine, hp, miles) {

    var rideRef = database.ref(DATABASE.userID + "/rides/" + company + model + year);
    rideRef.set({
        company: company,
        model: model,
        year: year,
        color: color,
        engine: engine,
        hp: hp,
        miles: miles
    });

}
