import React, {useEffect, useState} from 'react'
import { Box, Button, FormControl, Center,  FormLabel, Input, Stack, FormHelperText } from '@chakra-ui/react'
import axios from 'axios';
import { BASEURL } from '../API';
import { Link, Navigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    alert(`${username} ${password}`);
    try {
      const fetchData = await axios.post(`${BASEURL}/login`, {username, password});
      const response = await fetchData.data;
      localStorage.setItem('Auth Token', response.data.token);
      setLogin(true);
    }catch(err) {
      setLogin(false);
    }
  }


  return (
    <Stack>
      <Box as='h1' fontWeight="bold" fontSize="2rem">
        Login
      </Box>
      <FormControl as='form' onSubmit={onSubmitLogin}>
        <FormLabel>Username</FormLabel>
        <Input placeholder="Username" type="text" variant="outline" value={username} onChange={(e) => setUsername(e.target.value)} />
        <FormLabel>Password</FormLabel>
        <Input placeholder="Password" variant="outline" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type='submit'>Login</Button>
      </FormControl>
      {login && <Navigate replace to="/checklist"/>}
    </Stack>
  )
}

export default Login