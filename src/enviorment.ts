

interface env {
    production: boolean,
    firebase: fire_base
}
interface fire_base {
    apiKey: string
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
}
export const environment: env = {
    production: false,
    firebase: {
        apiKey: "AIzaSyCS2-JecXYtqfRmOmvIL-q-kFh2VD86kyQ",
        authDomain: "test-app-d051b.firebaseapp.com",
        databaseURL: "https://test-app-d051b-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "test-app-d051b",
        storageBucket: "test-app-d051b.appspot.com",
        messagingSenderId: "884943927455",
        appId: "1:884943927455:web:3ffddbe47f65c600768aaa",
        measurementId: "G-NVKDSPNXPK"
    }
}