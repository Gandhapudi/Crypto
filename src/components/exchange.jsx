import {React,useState,useEffect,} from 'react'
import Loader from './loader';
import axios  from 'axios';
import Error from './Error';

import {  Box, VStack ,HStack, Container, Image,Text} from '@chakra-ui/react'
   
   
const Exchange = () => {
    
    
    
    const [loader,setloader]=useState(true);
    
    const [data,setdata] =useState([]);
    
    const [typeofcurrency,settypeofcurrency]=useState("inr");
    const [error,seterror] =useState(false);
   

    const [currentPage, setcurrentPage] = useState(1);
   


   
    useEffect(()=>{
         const datafetch=async ()=>{
            
           try{ 
        let dataload=await axios.get(`https://api.coingecko.com/api/v3/exchanges`)
         setdata(dataload.data);
         setloader(false);
         seterror(false);
         
         

         
          
        }
        catch(e){
            seterror(true);
            setloader(false);
            console.log(e)
          
            
           
            
            
            
            
        }
    }
        
      datafetch();
      
    },[typeofcurrency,error,loader,currentPage]);
   


    if (error) return (<Error />);
     return (
        

     loader?<Loader />:
       <>
       
        <Container id="kaja" maxWidth={"container.xl"} paddingTop={"20px"} >

            <HStack flexWrap={"wrap"} rowGap={10} columnGap={10} justifyContent={"center"}  >
           {console.log("anil")}
         {data.map((value)=>{
          return ( 
            <>
            <a className="bg-slate-200 pt-5 h-[200px] shadow-2xl hover:scale-110  cursor-pointer   rounded-md " target={"_blank"} href={value.url} >
            <VStack  width={"200px"}>
         <Image width={"60px"} src={value.image}></Image>
         
            
         <Box textColor={'black'} fontSize={"xl"}>{value.name} </Box>
         <HStack> <Text color="black">Trust</Text> <Text color={"black"}>{value.trust_score}</Text></HStack>
         <Box color={"black"} >{value.current_price}</Box>
         </VStack>
        </a></>)
         })       
            }
            
            </HStack>
            <br></br><Box display={'flex'} justifyContent="center">
              </Box>
            <br></br>    
        </Container>

        </>
)
  
  
 
        }
        
  
        


export default Exchange