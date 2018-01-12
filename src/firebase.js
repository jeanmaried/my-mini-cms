import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA0fEXPYoVhCRu5540mIVW5Dxzyxy05fqw',
  authDomain: 'mi-mini-cms.firebaseapp.com',
  databaseURL: 'https://mi-mini-cms.firebaseio.com',
  projectId: 'mi-mini-cms',
  storageBucket: 'gs://mi-mini-cms.appspot.com',
  messagingSenderId: '134708493332'
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
