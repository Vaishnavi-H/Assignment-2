import React, { useState,useEffect} from 'react';
import './Multiselect.css';
import axios from 'axios';
import {useQuery} from 'react-query';



function Multiselect(){
const [name,setName]=useState('');
const[show,setShow]=useState(false);
const[addName,setAddName]=useState([]);
const[filtername,setFilterName]=useState("",[]);
//const[remove,setRemove]=useState([]);
const[hide,setHide]=useState([]);
const[options,setOptions]=useState({});


const Async = async()=>{
  const {data} = await axios('https://api.instantwebtools.net/v1/passenger?page=0&size=10');
  setOptions(data); 
};
    
const { data,isLoading, isError,isSuccess } = useQuery("data", Async);
       
const handleClick = (e) => {
e.preventDefault();
 setName(e.target.value);
 AddTask();
}

const AddTask = () => {
if(name !== ""){
const taskDetails={
value:name
};
setAddName([...addName,taskDetails]);}
};

const removeall=()=>{
if(name!==""){
const clear={
value:<button class="btn3" onClick={removeHandle}><i id="fig1" class="fa fa-close"></i></button>,}
setHide([clear]);
}
}    

const removeHandle=()=>{
setAddName([]);
setHide([]);
}

const removeTask = (e, value)=>{
e.preventDefault();
setAddName(addName.filter((t) => t.value !== value));
};

const filterHandle =(e)=>{
setFilterName(e.target.value);
console.log(filtername);
}

function filtered(options){
return options.data.filter((option) =>
option.name.toLowerCase().includes(filtername.toLowerCase())
);}

const removeOption=(options)=>{
const removeitem = (options.data.filter((option) => option.name !== name
   ));
 setOptions(removeitem); 
 }
 
return(
<div>
     <span>{hide.map((r)=>(
     <div>{r.value} </div>))} </span>

<div class="box">
    {addName.map((t) => (
            <div class="ui" key={t.id}>{t.value} &nbsp;
                <i onClick={(e)=> {removeTask(e, t.value);}} id="fig2"class="fa fa-close"></i>
            </div>))
    } 
    <input type="text" placeholder="search" onChange={(e) => filterHandle(e)} /> 
    <button class="b2" onClick={()=>setShow(!show)} ><i id="fig"class="fa fa-angle-down"></i></button>
</div> 
    {isLoading?( <p>Loading </p>):null}
    {isError && <p>error</p>}
    {isSuccess &&     
    <div>   
       {show?
    
        <div class="container">
              {filtered(options).map((a) => ( 
              <div class="ba">
              <option onClick={(e)=> {handleClick(e);removeall()}}  >{a.name}</option> </div> 
              ))}
         </div>
      
       :null }
    </div>     
    }
</div>
);
}
export default Multiselect;
