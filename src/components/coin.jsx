import {React, useEffect, useMemo, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Badge, Box, Container, HStack, Image, Progress, Select, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Tooltip, VStack,  } from '@chakra-ui/react';
import { useToast,Button } from '@chakra-ui/react'
import Loader from './loader';
import Chart from './chart';
import "../styles/coin.css"

const Coin = () => {
  
function handler(e){
  let a=document.getElementsByClassName("time");
  for(let i=0;i<a.length;i++){
    a[i].classList.remove("hgf")
  }
  e.target.classList.add("hgf");
  setdate(e.target.value)
  
  }
 

  
    const [data,setdata] =useState({});
    const [select1,setselect1]=useState(true);
    const [chardata,setchardata]=useState({});
    const [date,setdate]=useState(1);
    
    
    const [loader,setloader]=useState(true);
    const f=useParams();
    
    
    const [values,setvalues]=useState("aed");
    
    
    useEffect(()=>{
     
     const a=async ()=>{
     const b= await  axios.get(`https://api.coingecko.com/api/v3/coins/${f.id}`)
     const {data:chardata}=await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${values}&days=${date}`)
     setchardata(chardata.prices)
     console.log(b.data.market_data.ath)
     setselect1(true)
     setdata(b.data)
     
    
     setloader(false)
    
    }
     a();
    },[f.id,select1,values,date]);
        
    
    
    
    
  
  return (
    loader===true?<Loader />:
    <ChakraProvider>
    <>
    <Box width={"100%"} height={"5px"}> </Box>
  
  <Box  className="sticky xl:fixed z-30 w-[30%]" justifyContent={"center"} onClick={()=>{if(select1){document.getElementById("data1").style.filter="blur(5px)"}}}   >
  <label for="small" class="block text-sm font-medium  text-black  md:w-[30%]    outline-black md:left-[22%] sm:left-[19%]  sm:w-[100px] mobile:left-[38%]">Select currency
  <br></br>  <select  onFocus={(e)=>{e.target.size=10}}  onBlur={(e)=>{e.target.size=1}} size={1} id="small" dir='down'   className=' border-black  w-[100px] focus:ring-offset-1 focus:ring-black mt-2 rounded-sm  outline-dotted  focus:ring-2 text-black bg-white overflow-auto '   
onChange={(e)=>{
e.target.size=1;
e.target.blur();
 setselect1(false);
 setvalues(e.target.value)
 console.log(e.target.value)
 
 document.getElementById("data1").style.filter="blur(0px)" 
 }}>{
 Object.keys(data.market_data.ath).map((a)=>{
  
  return(<option  className='w-[100%] bg-white'  value={a}>{a}</option>)})}
  
  
</select></label></Box>

<Box id="data1" class=" sm: flex-col md:flex-col"  width={["100%","100%"]} height={"100%"}   position={"relative"}   >

<div   class=" pt-5   w-[100%] flex flex-col cursor-pointer  items-center justify-center gap-y-2  "     >
 
<Image  width={"60px"} flex  src={data.image.small} marginTop={"4px"}></Image>
 <Stat  size={"sm"}>
 <StatLabel textAlign={"center"} >{data.name}</StatLabel>
 <StatNumber >{""}</StatNumber>
  <StatHelpText   >
      <StatArrow  type={data.market_data.market_cap_change_percentage_24h_in_currency[values]>0?"increase":"decrease"}  />
      {data.market_data.market_cap_change_percentage_24h_in_currency[values]} 
  </StatHelpText>
  </Stat>
 <Progressbar high={data.market_data.high_24h[values]} low={data.market_data.low_24h[values]} data={data} values={values} ></Progressbar>

 <HStack><Box fontWeight={"light"}>{"Last Updated "}</Box><Box fontWeight={"light"}  textColor={"whatsapp.600"}>{new Date(data.market_data.last_updated).toDateString()}</Box></HStack>


 </div><Box className='flex justify-center'><Chart price={chardata} /> </Box>
 <br></br>
 <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"} gap={2}>
  <Button colorScheme='whatsapp' className="time hgf"  onClick={handler} size={"sm"} value={1}>24hrs</Button>
  <Button colorScheme='whatsapp' className="time  "size={"sm"}  onClick={handler}  value={2}>2d</Button>
  <Button colorScheme='whatsapp'className="time"  size={"sm"} onClick={handler} value={5}>5d</Button>
  <Button colorScheme='whatsapp' className="time" size={"sm"} onClick={handler} value={10}>10d</Button>
  <Button colorScheme='whatsapp' className="time"size={"sm"} onClick={handler} value={15}>15d</Button>
  <Button colorScheme='whatsapp' className="time" size={"sm"} onClick={handler} value={30}>1m</Button>
  <Button colorScheme='whatsapp'className="time"  size={"sm"} onClick={handler}value={90}>3m</Button>
  <Button colorScheme='whatsapp' className="time" size={"sm"} onClick={handler}value={180}>6m</Button>
  <Button colorScheme='whatsapp' className="time" size={"sm"} onClick={handler}value={360}>12m</Button>
  <Button colorScheme='whatsapp'className="time"  size={"sm"} onClick={handler}value={720}>2y</Button>
  <Button colorScheme='whatsapp' className="time" size={"sm"} onClick={handler}value={1080}>3y</Button>
  <Button colorScheme='whatsapp'className="time"  size={"sm"} onClick={handler}value={1825}>5y</Button>
  <Button colorScheme='whatsapp' className="time" size={"sm"} onClick={handler}value={3650} >1y</Button>
  


 </Box>
 <br></br>

 </Box>
 
 
</></ChakraProvider>
  )
 
}


const Progressbar=({high,low,data,values})=>{
  return (
    <>
    <VStack width={"50%"}  >
     <Progress colorScheme={"whatsapp"} bgColor={"red.800"} width={"100%"} value={(low/high)*100} />  
    <HStack width={"100%"} height={"15px"} justifyContent={"space-between"} >
      <Box color={"red"} fontSize={"2xs"} fontWeight={"bold"}>{low}</Box>
      <Tooltip label={100-(low/high)*100}>24_hrange</Tooltip>
      <Box color={"green"}fontSize={"2xs"} fontWeight={"bold"}>{high}</Box>
    </HStack>
    <HStack width={"100%"} height={"15px"} justifyContent={"space-between"}  >
      <Box textColor={"black"} fontWeight={"light"}>Market Rank</Box>
      <Badge color={"Black"} colorScheme='red'>#{data.coingecko_rank}</Badge>
      
    </HStack>
    <HStack width={"100%"} height={"15px"} justifyContent={"space-between"}  >
    <Box textColor={"Black"} fontWeight={"light"}>Price</Box>
      <Badge color={"Black"} colorScheme='red'>{data.market_data.current_price[values]}</Badge>
    </HStack>
    <HStack width={"100%"} height={"15px"} justifyContent={"space-between"}  >
    <Box textColor={"Black"} fontWeight={"light"}>MaxSupply</Box>
      <Badge color={"Black"} colorScheme='red'>{data.market_data.max_supply}</Badge>
    </HStack>
    <HStack width={"100%"} height={"15px"} justifyContent={"space-between"}  >
    <Box textColor={"Black"} fontWeight={"light"}>Circulating_Supply</Box>
      <Badge color={"Black"} colorScheme='red'>{data.market_data.circulating_supply}</Badge>
    </HStack>
    <HStack width={"100%"} height={"15px"} justifyContent={"space-between"}>
    <Box textColor={"Black"} fontWeight={"light"}>Total Supply</Box>
      <Badge color={"Black"} colorScheme='red'>{data.market_data.total_supply}</Badge>
    </HStack>
    <HStack width={"100%"} height={"15px"} justifyContent={"space-between"}>
    <Box textColor={"Black"} fontWeight={"light"}>All Time High</Box>
      <Badge color={"Black"} colorScheme='red'>{data.market_data.ath[values]}</Badge>
    </HStack>
    <HStack width={"100%"} height={"15px"} justifyContent={"space-between"}>
    <Box textColor={"Black"} fontWeight={"light"}>All Time Low</Box>
      <Badge color={"Black"} colorScheme='red'>{data.market_data.atl[values]}</Badge>
    </HStack>
    </VStack>

   
    </>
  )
}


export default Coin