        import Container from '@mui/material/Container';
        import * as React from 'react';
        import Card from '@mui/material/Card';
        import CardContent from '@mui/material/CardContent';
        import Button from '@mui/material/Button';
        import Typography from '@mui/material/Typography';
        import Divider from '@mui/material/Divider';
        import ToggleButton from '@mui/material/ToggleButton';
        import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
        import Todo from './Todo';
        import Grid from '@mui/material/Grid';
        import TextField from '@mui/material/TextField';
        import { useTodos } from './TodosContext';
        import Dialog from '@mui/material/Dialog';
        import DialogActions from '@mui/material/DialogActions';
        import DialogContent from '@mui/material/DialogContent';
        import DialogContentText from '@mui/material/DialogContentText';
        import DialogTitle from '@mui/material/DialogTitle';    
        import {  useToast } from './ToastContext';

        

        



export default function TodoList(){

  const{todos,dispatch} = useTodos()
  const {showHiddenAlert} = useToast()
  const [newTodo, setNewTodo] = React.useState("");
  
  
  React.useEffect(()=>{
    dispatch({type:"get"})
  },[dispatch])

  function handleChange (event) {
    setNewTodo(event.target.value)
    
  }
   function handleAdd () {
   dispatch({type:"added", payload:{title:newTodo}})
    setNewTodo('')
    showHiddenAlert("Added Successfully")
  }
    const [todosType , setTodosType] = React.useState("all")
    function handleTodoType(event,newFilter){
            setTodosType(newFilter)
             }


            const completedTodos =React.useMemo(()=> {
              return todos.filter((t)=>{
              return t.isCompleted
            })} ,[todos])

            const nonCompletedTodos = React.useMemo(()=> {
              return todos.filter((t)=>{
              return !t.isCompleted
            })} ,[todos])
            
            let newTodosType = todos

            if(todosType === "finished"){
              newTodosType = completedTodos
            }else if(todosType === "todo"){
              newTodosType = nonCompletedTodos
            }else{
              newTodosType=todos
            }

  //  let todosCard = todo.map((c) => {
  //       return <Todo id={c.id} title={c.title} desc={c.desc} />
  //   })
  const [openRemove , setOpenRemove] = React.useState(false);
  const [todoDialog , setTodoDialog] = React.useState(null)
  function handleClickOpenRemove(todo) {
    setOpenRemove(true);
    setTodoDialog(todo)
    
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };
  function handleRemoveBtn(){
            dispatch({type:"deleted" , payload:todoDialog})
            handleCloseRemove()
            showHiddenAlert("Removed Successfully")
            
        }

        
        const [openUpdate , setOpenUpdate] = React.useState(false);
        const [upTodo, setUpTodo] = React.useState({title:"" , desc:""})
        // const[todoUpdate , setTodoUpdate] = React.useState(null)
        
            function handleClickOpenUpdate (todo) {
            setTodoDialog(todo)
            setOpenUpdate(true);
            setUpTodo({title:todo.title , desc:todo.desc})
            
          };
        
          const handleCloseUpdate = () => {
            setOpenUpdate(false);
          };
          

    function handleTitleUpdate(e) {
  setUpTodo({
    ...upTodo,
    title: e.target.value
  });
}

function handleDescUpdate(e) {
  setUpTodo({
    ...upTodo,
    desc: e.target.value
  });
}
    function UpdateTodo(){
      
      
      dispatch({type:"updated" , payload:{title:upTodo.title , desc :upTodo.desc, id:todoDialog.id}})
      handleCloseUpdate()
       showHiddenAlert("Updated Successfully")
        
    }

        const TodosJsx = newTodosType.map((t) => {
    return <Todo key={t.id} todo={t} openRemove={handleClickOpenRemove} openUpdate={handleClickOpenUpdate} />
  })
    return(
      <>
      {/* REMOVE DIALOG */}
    <React.Fragment>
      <Dialog
        open={openRemove}
        onClose={handleCloseRemove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure That You Want To Remove This Todo?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText color='risky' id="alert-dialog-description">
            If You Remove It You Can't Go Back!!.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemove} color='risky'>No</Button>
          <Button onClick={handleRemoveBtn} color='risky'  autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
      {/* REMOVE DIALOG */}

      {/* --------------- */}

{/* UPDATE DIALOG */}
  <React.Fragment>
      
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Update This Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write Your New Title And Desc
          </DialogContentText>
          <form  id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              label="Edit Todo Title"
              type="text"
              fullWidth
              variant="standard"
              value={upTodo.title}
              onChange={handleTitleUpdate}
            />
              <TextField
              autoFocus
              required
              margin="dense"
              id="desc"
              label="Edit Todo Desc"
              type="text"
              fullWidth
              variant="standard"
              value={upTodo.desc}
              onChange={handleDescUpdate}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button onClick={UpdateTodo}  >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
{/* UPDATE DIALOG */}
          <Container maxWidth="sm">
               <Card sx={{ minWidth: 275 , maxHeight:'80vh',
  overflowY:'scroll'}}>
              <CardContent>
                <Typography variant="h1" component="h1" sx={{ fontSize: '3rem', fontWeight: 'bold' , textAlign:'center'}}>
                  TODO 
                </Typography>
                  <Divider />
                   <ToggleButtonGroup
                    value={todosType}
              exclusive
              onChange={handleTodoType}
               sx={{display:'flex' , justifyContent:'center' ,  mt: 3 }}
               color='primary'>
              <ToggleButton value="all" >
                All
              </ToggleButton>
              <ToggleButton value="todo" >
               Todo
              </ToggleButton>
              <ToggleButton value="finished" >
                Finished
              </ToggleButton>
              
            </ToggleButtonGroup>
              
              {TodosJsx}
                
              </CardContent>
              
<Grid container sx={{mt:2, mb:2, mr:2, ml:2}} spacing={2} >

  <Grid size={4}  >
    <Button onClick={handleAdd} disabled={ newTodo.length === 0 } style={{width:'100%' , height:'100%'  }} variant="contained" >Add Todo</Button>
  </Grid>
  <Grid size={8} >
    <TextField
    value={newTodo}
    onChange={handleChange} 
        style={{width:'100%'}}  
        id="outlined-basic" 
        label="Name Of Todo" 
        variant="outlined" />
  </Grid>
</Grid>
              
            </Card>
            </Container>
            </>
    )
}