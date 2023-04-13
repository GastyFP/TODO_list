import {GET_TODO,ADD_TODO,CHECK_TODO,DELETE_TODO} from "../actions/index"

const initialState = {
    todos: [],
}

export default function reducer(state = initialState , action){
    switch(action.type){

        case GET_TODO:
            return {
                ...state,
                todos: action.payload
            }
        case CHECK_TODO:
            return{
                ...state,
                todos: state.todos.map(item=>{
                    if(item.id === action.payload){
                        return {...item , checked: !item.checked}
                    }else {
                        return item
                    }
                })
            }
        case ADD_TODO:
            // console.log("entro reducer" , action.payload)
            return{
                ...state,
                todos: [...state.todos , action.payload]
            }
        case DELETE_TODO:
            return{
                ...state,
                todos: state.todos.filter(t=> t.id !== action.payload)
            }

        default: return state
    }
}

