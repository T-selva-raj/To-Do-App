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

export const enviorment: env = {
    production: true,
    firebase: {
        apiKey: "AIzaSyDPYvUVf7mF4L2anS6pRx_-4C6AG3DxvwY",
        authDomain: "todo-dev-f5aaa.firebaseapp.com",
        projectId: "todo-dev-f5aaa",
        storageBucket: "todo-dev-f5aaa.appspot.com",
        messagingSenderId: "910768977884",
        appId: "1:910768977884:web:b0b75212d48f97ac4c4119",
        measurementId: "G-YNP96BDJ0V",
        databaseURL: ""
    }
}