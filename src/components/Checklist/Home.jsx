import React, {useState} from 'react';
import {Stack, Box, Input, Button} from "@chakra-ui/react"
import { uid } from 'uid';
import axios from 'axios';
import { BASEURL, TOKEN } from '../../API';
import List from './List';
import { useParams, useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [datas, setDatas] = useState([]);
  const [newData, setNewData] = useState(null);

  const addItems = async () => {
    const postItems = await axios.post(`${BASEURL}/checklist`, {name}, {
      headers: {
        Authorization: `Bearer ${TOKEN()}`
      }
    });
    
    const data = postItems.data.data;

    setNewData(data);

    console.log(data);
  }

  const getAllItems = async () => {
    const getItems = await axios.get(`${BASEURL}/checklist`, {
      headers: {
        Authorization: `Bearer ${TOKEN()}`
      }
    });
    const data = getItems.data.data;

    setDatas(data);
    setNewData(null);
    console.log(getItems);
  }

  const deleteItems = async (id) => {
    const urlDeleteItems = `/checklist/${id}`
    await axios.delete(`${BASEURL}${urlDeleteItems}`,{
      headers: {
        Authorization: `Bearer ${TOKEN()}`
      }
    });
    setDatas(datas.filter((data) => data.id !== id));
    navigate(urlDeleteItems);
  }


  return (
    <Stack>
      <Box>
        <Input placeholder="create new item" value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={addItems}>New Item</Button> 
        <Button onClick={getAllItems}>Get All Checklist</Button>  
      </Box>
      {<Box>{newData ? newData.name : ""}</Box>}
      {datas && <List datas={datas} deleteItems={deleteItems} />}

    </Stack>
  )
}

export default Home