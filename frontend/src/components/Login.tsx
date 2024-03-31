import React from 'react'
import { Button, TextField, Typography } from '@mui/material'

const Login = () => {
  return (
    <div>
      This is a Login page
      <br/>
      <TextField placeholder='Email' size='medium' sx={{p:"10px"}}>
      </TextField>
      <br/>
      <TextField placeholder='Password' size='medium' sx={{p:"10px"}}>
      </TextField>
      <br/>
      <Button variant='contained' color='warning' sx={{borderRadius:"20px"}}>
        Login
      </Button>
      <Typography>Already have an account login</Typography>
    </div>
  )
}

export default Login
