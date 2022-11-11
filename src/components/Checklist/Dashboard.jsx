import { Button, Stack, Box, Input } from '@chakra-ui/react'
import React from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import DetailItem from './DetailItem'
import Home from './Home'

const Dashboard = () => {
  const params = useParams();
  const id = params["*"].split("")[0];
  return (
    <>
    <Routes>
      <Route path='/' index element={<Home />} />
    </Routes>
    </>
  )
}

export default Dashboard