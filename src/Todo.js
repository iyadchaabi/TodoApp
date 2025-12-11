        import Card from '@mui/material/Card';  
        import CardContent from '@mui/material/CardContent';
        import Typography from '@mui/material/Typography';
        import Grid from '@mui/material/Grid';
        import IconButton from '@mui/material/IconButton';
        import DeleteIcon from '@mui/icons-material/Delete';
        import CheckIcon from '@mui/icons-material/Check'
        import EditIcon from '@mui/icons-material/Edit';
        import {  useToast  } from './ToastContext';
        import { useTodos } from './TodosContext';


export default function Todo({todo , openRemove , openUpdate}){

    const {todos , dispatch} = useTodos()
    const {showHiddenAlert} = useToast()
    
    function handleCheckBtn(){
        dispatch({type:"checked" , payload:todo})
        if(!todo.isCompleted){
showHiddenAlert("Checked Succefully")
        }else{
          showHiddenAlert("Unchecked")
        }
        
    }
    
   
    function showDelete(){
      openRemove(todo)
      
    }
    function showUpdate(){
      openUpdate(todo)
    }
    return(
        <>
        




        <Card 
        sx={{ minWidth: 275 , color:'white' , background:'#1F2937' , mt: 3}}
        color='primary'
        >
            <CardContent>
        <Grid container >
            <Grid size={4} sx={{display:'flex' , justifyContent:'space-around'}}>
    <IconButton onClick={showDelete} className='btnIcon'  sx={{color:'red' , background:'white' , border: "2px solid red" ,  
        borderRadius: "50%", 
        width: "50px",        
        height: "50px",        
         }}>
        <DeleteIcon />
    </IconButton>
      <IconButton onClick={showUpdate}  className='btnIcon'  sx={{color:'blue' , background:'white' ,border: "3px solid blue",borderRadius: "50%", 
        width: "52px",        
        height: "52px",   }}>
        <EditIcon />
    </IconButton>
    <IconButton onClick={handleCheckBtn} className='btnIcon'  
    sx={{color: todo.isCompleted ? "white": '#8bc43a'   
        , background: todo.isCompleted ? '#8bc43a': "white"
        ,border: "3px solid #8bc43a"
        ,borderRadius: "50%"
        ,width: "50px"
        ,height: "50px"  }}>
        <CheckIcon />
    </IconButton>
  
            </Grid>
            <Grid size={8} >
                <Typography variant="h5" color='text' style={{  textAlign:'right', fontWeight:'bold' , textDecoration:todo.isCompleted?"line-through":"none"}}>
                    {todo.title}
                </Typography>

                <Typography variant="h6" color='text' sx={{  textAlign:'right'}}>
                    {todo.desc}
                </Typography>
            </Grid>
    
        </Grid>
                
            </CardContent>
            
        </Card>
        
        </>
    )
}