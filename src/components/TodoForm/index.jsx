import "./styles.css"
import { addTodo } from "redux/actions"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"


const TodoForm = () => {
    const [todoText = "" , setTodoText] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault()
        todoText ? dispatch(addTodo(todoText)) : Swal.fire("You must add something!")
    }
    const handleChange = (e) =>{
        // console.log(e.target.value)
        setTodoText(e.target.value)
    }

    return(
        <form onSubmit={handleSubmit} className="formContainer" >
            <input value={todoText} onChange={handleChange} className="formText" placeholder="Enter new to do" type="text" />
            <button type="submit" className="formBtn"> ADD TO DO </button>
        </form>
    ) 
}

export default TodoForm
