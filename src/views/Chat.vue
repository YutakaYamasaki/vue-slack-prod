<template>
  <div>
    <button @click="logout" class="btn btn-outline-dark">Logout</button>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase/app'
export default {
  name: 'chat',
  methods: {
    logout(){
      firebase.auth().signOut()
      this.$store.dispatch('setUser', null)
      this.$router.push('/login')
    }
  }
}
</script>
