import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.config.productionTip = false


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDVIfYUfqz2lCTt-d6hpJuqbxUwISCMwEk",
    authDomain: "vue-slack-prod.firebaseapp.com",
    databaseURL: "https://vue-slack-prod.firebaseio.com",
    projectId: "vue-slack-prod",
    storageBucket: "vue-slack-prod.appspot.com",
    messagingSenderId: "499665737999",
    appId: "1:499665737999:web:99a2cc9f61c57f0324c67a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    store.dispatch('setUser', user)
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
    unsubscribe()
  })



