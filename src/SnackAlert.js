import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function SnackAlert({open,message}) {
  


  return (
    <div>
       <Stack sx={{ width: '100%' }} spacing={2}>
      <Snackbar open={open} > 
       
      <Alert variant="filled" severity="success">
  {message}
</Alert>
     
        </Snackbar>
        </Stack>
    </div>
  );
}