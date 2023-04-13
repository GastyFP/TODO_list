import TodoListItem from "components/TodoListItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodo , deleteTodo , checkTodo } from "redux/actions";
import "./styles.css";

const TodoList = () => {
  const dispatch = useDispatch()
  const todos = useSelector(state=> state.todos)

  useEffect(() => {
    dispatch(getTodo())
  }, [dispatch]) //no deberia hacer esto. para eso esta reactQuery
  


  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId))
  };

  const toggleCheck = (todoId, isChecked) => {
    // console.log("tooglecheck:" , todoId)
    dispatch(checkTodo(todoId , isChecked))
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
        { todos.length > 0 ?
      <div className="todo-list-content">
          {todos && todos.map((item)=>(
            <TodoListItem key={item.id} onDelete={()=>handleDelete(item.id)} onCheck={()=>toggleCheck(item.id,item.checked)} checked={item.checked} label={item.label} />
          ))}
        
      </div> : 
      <div className="no-todos">
        Looks like you&apos;re absolutely free today!
      </div>
      }
    </div>
  );
};

export default TodoList;
