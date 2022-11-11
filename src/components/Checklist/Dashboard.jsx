import { Button, Stack, Box, Input } from '@chakra-ui/react'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'

const Dashboard = () => {
  return (
    <>
    <Routes>
      <Route path='/' index element={<Home />} />
      <Route path=':checklistId' element={<Home />} />
    </Routes>
    </>
  )
}

export default Dashboard