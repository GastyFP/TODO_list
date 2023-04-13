import axios from "axios"
import {v4 as uuid} from "uuid"
import Swal from "sweetalert2"

export const ADD_TODO = "ADD_TODO"
export const GET_TODO = "GET_TODO"
export const CHECK_TODO = "CHECK_TODO"
export const DELETE_TODO = "DELETE_TODO"

const url =  "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos"

export const getTodo = () => {
    return async function (dispatch){
        const response =  await axios("https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos")
        return dispatch({
            type: GET_TODO,
            payload: response.data
        })
    }
}

export const addTodo = (label) =>{
    try {
        let todo = {
            id: uuid(),
            label,
            checked: false
        }
        return async (dispatch) => {
            const response = await axios.post("https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos", todo)
            console.log(response)
            return dispatch({
                type: ADD_TODO,
                payload: todo,
            })
        }
    } catch (err) {
        Swal.fire("Oops, Something went wrong.\nPlease try again")
    }
}

export const checkTodo = (id , isChecked) =>{
  return async function (dispatch){
    try {
        const response = await axios.patch(url+`/${id}`, {checked: !isChecked})
        console.log(response.data)
    } catch (err) {
        Swal.fire({
            title: isChecked ? "Could not uncheck from DB" : "Could not check from DB",
            text: err.message,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "red",
            timer: 2000
        })
    }

    return dispatch({
            type: CHECK_TODO,
            payload: id
        })
    }
  }

export const deleteTodo = (todoId) =>{
    return async (dispatch)=>{
        try{
            const response = await axios.delete(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`,{id:todoId})
            console.log(response)
        }catch(err){
            Swal.fire({
                title: "Could not delete TODO from DataBase",
                text: "Error: " + err.message,
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: "red",
                timer: 2000
            })
        }
        return dispatch({
            type: DELETE_TODO,
            payload: todoId
        })
    }

}