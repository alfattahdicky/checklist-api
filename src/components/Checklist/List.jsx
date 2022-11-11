import React from 'react'
import Item from './Item'
import axios from 'axios'
import { BASEURL, TOKEN } from '../../API'


const List = ({datas}) => {

  const deleteItems = async (id) => {
    console.log(id);
    await axios.delete(`${BASEURL}/checklist/${id}`,{
      headers: {
        Authorization: `Bearer ${TOKEN()}`
      }
    });

    datas.filter((data) => data.id !== id);
  }

  return (
    datas.map((data) => {
      return (
        <Item key={data.id} id={data.id} name={data.name} deleteItem={() => deleteItems(data.id)}/>
      )
    })
  )
}

export default List