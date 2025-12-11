import { v4 as uuidv4 } from 'uuid';
export default function Reducer(currentTodos,action){
    switch(action.type){
        case"added":{

    const newTodoo ={
        id:uuidv4(),
        title:action.payload.title,
        desc:"Todo Details",
        isCompleted:false
    }
    const updatedTodos = [...currentTodos , newTodoo]
    
    localStorage.setItem("todos",JSON.stringify(updatedTodos))
    return updatedTodos
    

        }
        case"deleted":{
            const updatedTodos = currentTodos.filter((t)=>{
            return  t.id !==action.payload.id ;}
            )
            
            localStorage.setItem("todos",JSON.stringify(updatedTodos))
            return updatedTodos
        }
        case"updated":{
             const updatedTodo = currentTodos.map((t)=>{
        if(t.id === action.payload.id){
          return {...t , title:action.payload.title , desc:action.payload.desc}
        }else{
          return t
        }
      })
      
      localStorage.setItem("todos",JSON.stringify(updatedTodo))
      return updatedTodo
        }
        case"get":{
        const storageTodos = JSON.parse(localStorage.getItem("todos") ?? "[]")
        return storageTodos;
      }
      
        
        case"checked":{
             const updatedTodos = currentTodos.map((t) => {
            if(t.id === action.payload.id){
                const updatedTodos = {...t , isCompleted:!t.isCompleted}
                return updatedTodos;
            }
            return t

        })
        localStorage.setItem("todos",JSON.stringify(updatedTodos))
        return updatedTodos
        
        
        }
         default:{
        throw Error("Unknown Action " + action.type)
    }
    }
   


    
}