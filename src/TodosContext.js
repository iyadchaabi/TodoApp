import { createContext, useContext, useReducer  } from "react";
import Reducer from "./Reducers/TodoReducer";

export const TodosContext = createContext([])
 const TodosProvider = ({children})=>{
const[todos , todosDispatch]=useReducer(Reducer,[])
return(
    <TodosContext.Provider value={{todos:todos , dispatch:todosDispatch}} >
        {children}
    </TodosContext.Provider>
)
    

}
export const useTodos = ()=>{
    return useContext(TodosContext)
}

export default TodosProvider;


