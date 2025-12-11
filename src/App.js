import './App.css'
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TodoList from './TodoList';
import TodosProvider, { TodosContext } from './TodosContext';
import { ToastProvider } from './ToastContext';



        const initianlTodos =[
            // {
            //     id:uuidv4(),
            //     title:'Todo 1',
            //     desc:'Todo Details',
            //     isCompleted:false
            // },
            // {
            //     id:uuidv4(),
            //     title:'Todo 2',
            //     desc:'Todo Details',
            //     isCompleted:false
            // }
        ]




function App() {
  const [todos, setTodos] = React.useState(initianlTodos);

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    primary: {
      main: '#22c55e',
    },
    secondary: {
      main: '#1F2937',
    },
     risky: {
      main: '#d40006',
    },
    text:{
      main:"#F9FAFB"
    }
  },
});
   
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
      <ToastProvider>
<div style={{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  height:'100vh'
  
  
}}>
 
  
  
  <TodoList/>
 
  
  </div>
</ToastProvider>
</TodosProvider>
</ThemeProvider>
  );
}

export default App;
