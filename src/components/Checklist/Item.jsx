import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({name, id, deleteItem}) => {
  return (
    <Box display="flex" alignItems="center">
      <Link to={`/checklist/${id}`}>
        <Box>{name}</Box>
      </Link>
      <Button colorScheme="teal" onClick={() => deleteItem(id)}>Delete</Button>
    </Box>
  )
}

export default Item