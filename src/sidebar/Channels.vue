<template>
    <div>
        <b-button v-b-modal.my-modal>Add Channel</b-button>
        <!-- The modal -->
        <b-modal id="my-modal" title="Add Channel" ok-title="Add Channel" cancel-title="Cancel" @ok="addChannel">
            <form class="my-4">
                <div class="form-group">
                    <input v-model="new_channel" id="new_channel" name="new_channel" type="text" placeholder="Channel name" class="form-control">
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name:'channel',
    data() {
        return {
            new_channel: '',
            errors:[],
            channelsRef: firebase.database().ref('channels')
        }
    },
    methods: {
        addChannel(){
            let key = this.channelsRef.push().key
            console.log('newly creating channle key:',key)
            let newChannel ={id: key, name: this.new_channel}
            // create new channel
            this.channelsRef.child(key).update(newChannel)
            .then(() => {
                this.new_channel = ''
            })
            .catch((error)=>{
                this.errors.push(error.message)
            })
        }
    }
}
</script>

<style>

</style>