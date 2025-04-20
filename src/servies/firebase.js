import admin from "firebase-admin";

import  serviceAccount from "./accountKey.json" with {type:"json"};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rent-app-ce090-default-rtdb.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
export {db}