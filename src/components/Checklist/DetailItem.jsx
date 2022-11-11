import { Box, Text, Button, ButtonGroup, Stack, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { BASEURL, TOKEN } from '../../API';

const DetailItem = () => {
  const params = useParams();
  const idParams = parseInt(params.checklistid);
  const location = useLocation();
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [edit, setEdit] = useState(null);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState({});
  const [boolSearch, setBoolSearch] = useState(false);

  useEffect( () => {
    const getItems = async () => {
      const getItems = await axios.get(`${BASEURL}/checklist/${idParams}/item/`, {
        headers: {
          Authorization: `Bearer ${TOKEN()}`
        }
      });
      const data = getItems.data.data;
      console.log(getItems.data);
  
      setDatas(data);
    }

    getItems();
    
  }, [location.key]);

  useEffect(() => {
    if(edit) {
      setInput(edit.name);
    }else {
      setInput("");
    }
  }, [edit]);

  const completeItems = async (id) => {
    const complete = datas.map((data) => {
      if(data.id === id) {
        return {...data, itemCompletionStatus: !data.itemCompletionStatus}
      }else {
        return data;
      }
    });
    setDatas(complete);

    const urlComplete = `/checklist/${idParams}/item/${id}`;

    const putItems = await axios.put(`${BASEURL}${urlComplete}`, complete ,{
      headers: {
        Authorization: `Bearer ${TOKEN()}`
      }
    });

    navigate(urlComplete);

    console.log(putItems);
  }

  const editItems = (id) => {
    const getEditData = datas.find(data => {
      if(data.id === id) {
        return data;
      }
    })
    setEdit(getEditData);
  }

  const deleteItems = async (id) => {
    const urlDelete = `/checklist/${idParams}/item/${id}`
    await axios.delete(`${BASEURL}${urlDelete}`, {
      headers: {
        Authorization: `Bearer ${TOKEN()}`
      }
    });
    const filterItems = datas.filter(data => data.id != id);
    setDatas(filterItems);
    navigate(urlDelete);
  }

  const addItems = async () => {
    if(input && !edit) {
      const body = {itemName: input};
      const addChecklist = await axios.post(`${BASEURL}/checklist/${idParams}/item`, body ,{
        headers: {
          Authorization: `Bearer ${TOKEN()}`
        }
      });
      const response = addChecklist.data.data;
      setDatas([...datas, response]);
      setInput("");
    }else if(input && edit) {
      const updateChecklist = datas.map((data) => {
        const { id } = edit;
        if(data.id === id) {
          return {...datas, name: input}
        }else {
          return data
        }
      });
      const urlUpdate = `/checklist/${idParams}/item/rename/${edit.id}`;
      const updateItemChecklist = await axios.put(`${BASEURL}${urlUpdate}`, { itemName: input },
      {
        headers: {
          Authorization: `Bearer ${TOKEN()}`
        }
      });
      navigate(urlUpdate);
      setDatas(updateChecklist);
      setEdit(null);
      console.log(updateItemChecklist);

      setInput("");
    }
  }

  const searchItems = async () => {
    if(query) {
      const queryItemsIndex = datas.findIndex((e) => {
        if(e.name.toLowerCase() === query.toLowerCase()) {
          return e;
        }
      });
      const id = datas[queryItemsIndex].id;
      const urlFindItem = `/checklist/${idParams}/item/${id}`;
      const findItemsApi = await axios.get(`${BASEURL}${urlFindItem}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN()}`
        }
      });
      const response = findItemsApi.data.data;
      navigate(urlFindItem);
      setSearchData(response);
      setBoolSearch(true);
    }else {
      setBoolSearch(false);
    }
  }

  return (
    <Stack className="" maxWidth="1200px">
      <Link to="/checklist">Back</Link>
      <Box as="h1" fontWeight="bold" fontSize="2rem">Detail Checklist Item </Box>
      <Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <Input placeholder="Add checklist item" value={input} 
          onChange={(e) => setInput(e.target.value)} />
          <Button paddingInline="2.5rem" onClick={() => addItems()}>
            {edit ? "Edit" : "Add"} Checklist Item</Button>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <Input placeholder="Search item" value={query} 
          onChange={(e) => setQuery(e.target.value)} />
          <Button paddingInline="2.5rem" onClick={() => searchItems()}>Search Item</Button>
        </Box>
      </Box>

      {
        boolSearch ? <Box display="flex" alignItems="center" justifyContent="space-between" marginBlock="1rem" gap="1rem" key={searchData.id}>
            <Text decoration={`${searchData.itemCompletionStatus ? "line-through" : ""} `} >{searchData.name}</Text>
            <ButtonGroup>
              <Button colorScheme="green" variant='outline' onClick={() => completeItems(searchData.id)}>Complete</Button>
              <Button variant='outline' colorScheme="orange" onClick={() => editItems(searchData.id)}>Edit</Button>
              <Button variant='outline' colorScheme="red" onClick={() => deleteItems(searchData.id)}>Delete</Button>
            </ButtonGroup>
          </Box> : datas.map((el) => {
        return (
          <Box display="flex" alignItems="center" justifyContent="space-between" marginBlock="1rem" gap="1rem" key={el.id}>
            <Text decoration={`${el.itemCompletionStatus ? "line-through" : ""} `} >{el.name}</Text>
            <ButtonGroup>
              <Button colorScheme="green" variant='outline' onClick={() => completeItems(el.id)}>Complete</Button>
              <Button variant='outline' colorScheme="orange" onClick={() => editItems(el.id)}>Edit</Button>
              <Button variant='outline' colorScheme="red" onClick={() => deleteItems(el.id)}>Delete</Button>
            </ButtonGroup>
          </Box>
        )
      })}

    </Stack>

  )
}

export default DetailItem