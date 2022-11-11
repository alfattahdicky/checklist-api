import { Box, Button, FormControl, Center,  FormLabel, Input, Stack, FormHelperText } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { BASEURL } from '../API';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [information, setInformation] = useState("")

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    alert(`${username}, ${email}, ${password}`)
    const data = {email, password, username}
    const fetchData = await axios.post(`${BASEURL}/register`, data);
    const response = await fetchData.data;

    setInformation(response.message);
    setEmail("");
    setPassword("");
    setUsername("");
  }
  

  return (
    <Stack>
        <Box as='h1' fontWeight="bold" fontSize="2rem">
          Register
        </Box>
        <FormControl as='form' onSubmit={onSubmitRegister}>
          <FormLabel>Username</FormLabel>
          <Input placeholder="Username" type="text" variant="outline" value={username} onChange={(e) => onChangeUsername(e)} />
          <FormLabel>Email</FormLabel>          
          <Input placeholder="Email" variant="outline" type="email" value={email} onChange={(e) => onChangeEmail(e)} />
          <FormLabel>Password</FormLabel>    
          <Input placeholder="Password" variant="outline" type="password" value={password} onChange={(e) => onChangePassword(e)} />
          <Button type="submit">Register</Button>
          <FormHelperText>{information}</FormHelperText>
        </FormControl>
    </Stack>
  )
}

export default Signup