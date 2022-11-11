import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import DetailItem from './DetailItem'

const Item = ({name, id, deleteItem, onDetail}) => {
  return (
    <Box display="flex" alignItems="center">
      <Link  to={`/checklist/${id}/item`}>{name}</Link>
      <Button colorScheme="teal" onClick={() => deleteItem(id)}>Delete</Button>
    </Box>
  )
}

export default Item