<template>
  <div id="app"
    @click.self="revert">
    <Card text="To Do List App">
      <ul>
        <li 
          v-for="todo in todos"
          :key="todo.id"
          @click.self="revert"
          :class="{ done: todo.done }">
          <input type="checkbox"
            v-model="todo.done"
            @change="editStatus(todo)">
            <input type="text" class="input input-custom-width"
              v-model="todoTitle"
              v-if="todoId == todo.id"
              @keyup.enter="editTitle(todo)">
            <span @dblclick="editable(todo)" v-if="!todoId && todoId != todo.id">
              {{ todo.title }}
            </span>
            <a class="right"
              @click.prevent="deleteTodo(todo)">
              <faIcon class="icon" icon="trash"/>
            </a>
        </li>
      </ul>
    </Card>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Card from './components/Card.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faTrash)
 
Vue.component('faIcon', FontAwesomeIcon)

axios.defaults.baseURL = 'http://localhost:3000/api'

export default {
  name: 'app',
  components: {
    Card
  },
  data(){
    return{
      todoId: null,
      todoTitle: '',
      todos: []
    }
  },
  methods: {
    fetch(){
      axios.get('/tasks')
      .then( response => this.todos = response.data )
    },
    editable(todo){
      this.todoId = todo.id
      this.todoTitle = todo.title
    },
    revert(){
      this.todoId = null
      this.todoTitle = ''
    },
    editStatus(todo){
      axios.put(`/task/${todo.id}`, {
        done: todo.done
      })
      .then( () => {
        this.$emit('added')
        this.revert()
      })
      .catch( err => {
        if(err){
          this.$swal({
            title: 'Something wrong..',
            text: "Cannot change task's status..",
            type: 'error',
            showCancelButton: false
          })
        }
      })
    },
    editTitle(todo){
      axios.put(`/task/${todo.id}`, {
        title: this.todoTitle
      })
      .then( () => {
        this.$emit('added')
        this.$swal({
          title: 'Edited!',
          text: 'Task title has been edited.',
          type: 'success'
        })
        this.revert()
      })
      .catch( err => {
        if(err){
          this.$swal({
            title: 'Something wrong..',
            text: "Cannot change task's title..",
            type: 'error',
            showCancelButton: false
          })
        }
      })
    },
    deleteTodo(todo){
      this.$swal({
        title: 'Are you sure want to delete?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      })
      .then( result => {
        if (result.value) {
          axios.delete(`/task/${todo.id}`)
          .then( () => {
            this.$emit('added')
            this.$swal({
              title: 'Deleted!',
              text: 'Your task has been deleted.',
              type: 'success'
            })
          })
          .catch( err => {
            if(err){
              this.$swal({
                title: 'Something wrong..',
                text: 'Cannot delete task..',
                type: 'error',
                showCancelButton: false
              })
            }
          })
        }
      })
    }
  },
  mounted(){
    this.fetch()
  },
  created(){
    this.$on('added', () => {
      this.fetch()
    })
  }
}
</script>

<style>
  *{
    margin: 0; padding: 0;
    font-family: 'Segoe UI';
    box-sizing: border-box;
  }

  html{
    font-size: 17px;
  }

  #app{
    background-color: var(--cloud);
    display: grid;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  li{
    list-style: none;
    padding: 0.5em 0;
    border-bottom: 2px solid var(--cloud);
  }

  li.done{
    color: green;
    text-decoration: line-through;
  }

  .right{
    float: right;
    cursor: pointer;
  }

  .icon{
    color: #95a5a6;
  }

  .icon:hover{
    color: #7f8c8d;
    transition: 400ms;
  }

  input{
    font-size: 1em;
  }

  input[type=checkbox] {
    margin-right: 0.5em;
  }

  input[type=text] {
    padding: 0.1em 0.8em;
  }

  .input-custom-width{
    width: 80%;
  }

</style>
