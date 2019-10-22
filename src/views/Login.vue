<template>
  <div>
    <div class="jumbotron bg-primary text-white text-center">
      <h2 class="lead display-3">#Awesome Chat#</h2>
      <p>Real time communictation at it's best!</p>
    </div>
    <div class="alert alert-info" v-if="loading">Processing...</div>
    <div class="alert alert-danger" v-if="hasErrors">
      <div v-for="error in errors" v-bind:key="error">{{error}}</div>
    </div>
    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col text-center">
          <button @click="loginWithGoogle" class="btn btn-outline-danger btn-lg">Login with Google</button>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col text-center">
          <button class="btn btn-outline-info btn-lg">Login with Twitter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
export default {
  name: 'login',
  data(){
    return{
      errors:[],
      loading: false,
      usersRef: firebase.database().ref('users')
    }
  },
  computed:{
    hasErrors(){
      return this.errors.length > 0
    }
  },
  methods: {
    loginWithGoogle(){
      this.loading = true
      this.errors = []
      // console.log('login With google')
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response)=> {
        // console.log(response.user)
        this.saveUserToUsersRef(response.user)
        this.$store.dispatch('setUser', response.user)
        this.$router.push('/')
      })
      .catch(error =>{
        this.errors.push(error.message)
        this.loading = false
      })
    },
    saveUserToUsersRef(user){
      return this.usersRef.child(user.uid).set({
        name: user.displayName,
        avatar: user.photoURL
      })
    }
  }
}
</script>