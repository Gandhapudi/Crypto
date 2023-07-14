import {React,useEffect,useState} from 'react'
import { HStack,Button } from '@chakra-ui/react'


function  Mapp(){
  const [currentpage,setcurrentpage]=useState("1");
  const [minpage,setminpage]=useState(0);
  const [maxpage,setmaxpage]=useState(10);
  const contentperpage=10;
  const [data,setdata]=useState(["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]);
  const [dataslice,setdataslice]=useState(data.slice(0,10));
  useEffect(()=>{

  },[setdataslice])

  
  const handel=(e)=>{
    console.log(currentpage)
   
    document.getElementById(String(Number(currentpage))).style.backgroundColor="rgb(74 222 128)";
    setcurrentpage(String(Number(e.target.id)))
    e.target.style.backgroundColor="red"
}
const previousbtn=()=>{
    if(currentpage>minpage+1 && currentpage!=minpage ){
  document.getElementById(currentpage).style.backgroundColor="rgb(74 222 128)";
  setcurrentpage(currentpage-1);
  console.log(currentpage)
  document.getElementById(currentpage-1).style.backgroundColor="red";}
  else if(currentpage<=minpage ){
    console.log(currentpage) 
    setdataslice(data.slice(0,10));
    setminpage(1);
    setmaxpage(10);
    setcurrentpage("10");
    
    document.getElementById(currentpage).style.backgroundColor="rgb(74 222 128)"
  
 

  }
  else{
    setcurrentpage(String(Number(currentpage)-1))
  }
}

const nextbtn=()=>{
  
  if(currentpage<maxpage && currentpage!=minpage){
    document.getElementById(currentpage).style.backgroundColor="rgb(74 222 128)";
    setcurrentpage(String(Number(currentpage)+1));
    console.log(currentpage)
    document.getElementById(String(Number(currentpage)+1)).style.backgroundColor="red";}
    else if(currentpage>=maxpage){
      setminpage(10);
      setdataslice(data.slice(10,21))
      setmaxpage(20);
    console.log(currentpage)
    }
    else{
      let d= document.getElementsByClassName("anil");
      
      for (const m of d) {
        console.log(m)
        m.style.backgroundColor="rgb(74 222 128)"
      }
      document.getElementById(String(Number(currentpage)+1)).style.backgroundColor="red";
      setcurrentpage(String(Number(currentpage)+1))
    }
  }
  
 




  return(
    
    <><HStack justifyContent={"center"} width={"100%"}> 
    <HStack height={"100vh"} alignItems={"center"} id="main" justifyContent={"center"} width={"100%"} >
    <Button colorScheme={"facebook"} onClick={previousbtn}  >Previous</Button>
    
      {dataslice.map((value)=>{
      return(
      <Button className='anil' bgColor={"whatsapp.500"} colorScheme={"whatsapp"} id={value} values={value} onClick={handel}  >{value}</Button>)})
    }
    <Button colorScheme={"facebook"} onClick={nextbtn}>Next</Button></HStack></HStack></>)
   
}

const Paggination = () => {
  
  
  


  return (
    <>
    <Mapp />
</>
  )
}

export default Paggination