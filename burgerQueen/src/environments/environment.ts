// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'burger-aquelarre',
    appId: '1:295164702885:web:2df907eb52d5aa2af95d4c',
    databaseURL: 'https://burger-aquelarre-default-rtdb.firebaseio.com',
    storageBucket: 'burger-aquelarre.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCIQYqpHx5YXNQtPyAmJN13OsjFY39pYvU',
    authDomain: 'burger-aquelarre.firebaseapp.com',
    messagingSenderId: '295164702885',
  },
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCIQYqpHx5YXNQtPyAmJN13OsjFY39pYvU",
    authDomain: "burger-aquelarre.firebaseapp.com",
    databaseURL: "https://burger-aquelarre-default-rtdb.firebaseio.com",
    projectId: "burger-aquelarre",
    storageBucket: "burger-aquelarre.appspot.com",
    messagingSenderId: "295164702885",
    appId: "1:295164702885:web:2df907eb52d5aa2af95d4c"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
