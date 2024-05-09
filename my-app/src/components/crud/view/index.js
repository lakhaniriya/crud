import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Routes, Route, useParams } from 'react-router-dom';
function View() {

    let { id } = useParams();
    console.log("id",id)
    const [value,setValue]=useState()
    console.log("dd",value)
    const record =  value && value[id]
    console.log("dre",record)
    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
          setValue(JSON.parse(storedItems));
        }
      }, []);
  return (
    <>
     <div>
        {
         record?.firstName
        },
        {
         record?.email
        },
        {
         record?.lastName        }
     </div>

    </>
  );
}

export default View;

