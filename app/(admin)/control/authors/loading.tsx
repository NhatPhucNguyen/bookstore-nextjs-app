import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: 50,backgroundColor: 'rgba(0, 0, 0, 0.7)'}}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  )
}

export default Loading