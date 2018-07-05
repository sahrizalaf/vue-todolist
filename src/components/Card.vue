<template>
  <div class="card">
    <div class="card-header">
      <h1>{{ text }}</h1>
    </div>
    <div class="card-body-wrapper">
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
    <div class="card-footer">
      <transition name="fade">
        <input type="text" class="input input-add fixed-bottom" placeholder="Add Task"
          v-show="formAddVisible"
          v-model="newTodoTitle"
          @keyup.enter="addTodo">
      </transition>
      <button @click="toggle"> + </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Card',
  props: {
    text: String
  },
  data(){
    return{
      newTodoTitle: '',
      formAddVisible: false
    }
  },
  methods: {
    toggle(){
      this.formAddVisible = !this.formAddVisible
    },
    addTodo(){
      if( this.newTodoTitle !== '' ){
        axios.post('/tasks', {
          title: this.newTodoTitle,
          done: false
        })
        .then( () => {
          this.newTodoTitle = ''
          this.$emit('added')
          this.toggle()
          this.$swal({
            title: 'Saved!',
            text: 'Task has been added to your list.',
            type: 'success'
          })
        })
        .catch( err => {
          if(err){
            this.$swal({
              title: 'Something wrong..',
              text: "Cannot add task..",
              type: 'error',
              showCancelButton: false
            })
          }
        })
      }
    }
  },
  created(){
    this.$on('added', () => {
      this.$parent.fetch()
    })
  }
}
</script>

<style>
:root {
  --padding: 0.8em 1.4em;
  --blue: #3498db;
  --grey: #95a5a6;
  --cloud: #ecf0f1;
}

.card {
  background-color: #fff;
  min-width: 450px;
  max-width: 50vw;
}

.card-header,
.card-body {
  padding: var(--padding);
}

.card-header,
.card-footer {
  color: var(--cloud);
}

.card-header {
  text-align: center;
  background-color: var(--blue);
  border: 1px solid var(--blue);
  border-radius: 8px 8px 0 0;
}

.card-body {
  position: relative;
  overflow-y: auto;
  min-height: 60vh;
  max-height: 60vh;
}

.card-footer {
  position: relative;
  border-radius: 0 0 8px 8px;
}

.input{
  border: 2px solid var(--blue);
  border-radius: 5px;
  outline: none;
}

.input-add{
  margin-left: 1.4em;
  padding: 0.5em 0.8em !important;
}

.input:focus{
  box-shadow: 0 0 15px 1px var(--blue);  
  transition: 400ms;
}

.fixed-bottom {
  position: absolute;
  top: -100%;
  width: calc(100% - 2.8em);
}

button {
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.5em;
  font-weight: bold;
  background-color: var(--blue);
  color: var(--cloud);
  padding: 0.5em 1em;
  border-radius: 0 0 8px 8px;
}

button:hover {
  background-color: #2980b9;
  transition: 500ms;
}

/* Transition */
.fade-enter-active, .fade-leave-active {
  transition: all 400ms;
}
.fade-enter, .fade-leave-to {
  transform: translateY(15px);
  opacity: 0;
}

</style>
