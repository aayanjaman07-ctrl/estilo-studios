const firebaseConfig = {
    apiKey: "AIzaSyCHSsLi_yfDtfO0w3VVuPE_2Hw4PMqOT2Y",

    authDomain: "clothing-site-b7891.firebaseapp.com",

    projectId: "clothing-site-b7891",

    storageBucket: "clothing-site-b7891.firebasestorage.app",

    messagingSenderId: "905429333006",

    appId: "1:905429333006:web:4e65e29194133fee8ef85f"
};

/* INITIALIZE */

firebase.initializeApp(firebaseConfig);

/* SERVICES */

const db = firebase.firestore();

const auth = firebase.auth();