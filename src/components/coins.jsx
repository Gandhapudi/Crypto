import {React,useState,useEffect,} from 'react'
import Loader from './loader';
import axios  from 'axios';
import Error from './Error';
import "../styles/pagination.css"
import { Button, Box, VStack ,HStack, Container, Image,Text,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
   useDisclosure,RadioGroup,Tooltip, useToast, ChakraProvider, Flex} from '@chakra-ui/react'
   
   import {FaArrowLeft,FaArrowRight} from "react-icons/fa"
import { Link } from 'react-router-dom';
const Coins = () => {
    const toast=useToast();
    const [toast1,settoast1]=useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = useState('right');
    
    const [loader,setloader]=useState(true);
    
    const [data,setdata] =useState([]);
    const [currency,setcurrency] = useState({});
    const [typeofcurrency,settypeofcurrency]=useState("inr");
    const [error,seterror] =useState(false);
    const[typeoferror,settypeoferror]=useState("");

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(100);
  
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const [currencydata,setcurrencydata]=useState({});

    const PaginationComponent=()=> {
      
    
     
    
      const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
        event.target.style.backgroundColor="#32bf0a"
      };
    
      const pages = [];
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
      }
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      
    
      const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li 
            class=" text-black" 
              key={number}
              id={number}
              className={currentPage === number ? "active" : null}  
              onClick={(e)=>{
                  e.target.style.backgroundColor="#32bf0a"
                  setcurrentPage(number);
                  setloader(true)
                  console.log(currentPage);
                  document.getElementById(currentPage).style.backgroundColor="#126f6f"
              }}
             >
            
                 
                {number}
            </li>
          );
        } else {
          return null;
        }
      });
    
      
    
      const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);
        
    
        if (currentPage + 1 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
          
        }
      };
    
      const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);
    
        if ((currentPage - 1) % pageNumberLimit === 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
      };
    
      let pageIncrementBtn = null;
      if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
      }
    
      let pageDecrementBtn = null;
      if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
      }
    
      
    
      return (
        <>
         
          
          <ul className="pageNumbers flex justify-evenly">
            <li>
              <Button colorScheme={"whatsapp"} 
                onClick={handlePrevbtn}
                size={["xs","md"]}
                
                
                isDisabled={currentPage === pages[0] ? true : false}
              >
                <FaArrowLeft size={"sm"} />
              </Button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
    
            <li>
              <Button colorScheme={"whatsapp"}
              margin={0.3}
                onClick={handleNextbtn}
                size={["xs","md"]}
                isDisabled={currentPage === pages[10 - 1] ? true : false}
               
              >
                <FaArrowRight size={"sm"} />
              </Button>
            </li>
          </ul>
          
        </>
      );
    }
    useEffect(()=>{
         const datafetch=async ()=>{
            
           try{ 
        let dataload=await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${typeofcurrency}&orde=market_cap_desc&per_page=100&page=${currentPage}&sparkline=false`)
        const b= await  axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin`)
        setdata(dataload.data);
        console.log(b.data.market_data.ath)
        setcurrencydata(b.data.market_data.ath)

         setloader(false);
         seterror(false);
         
        
         
         

         
          
        }
        catch(e){
            seterror(true);
            setloader(false);
            settypeoferror(e.message);
            settoast1(1);
            
            
            
           
            
            
            
            
        }
    }
        
      datafetch();
      
    },[typeofcurrency,error,loader,currentPage]);
   
    if(error){
      
    if(typeoferror!=="Network Error"){
     return (<><Error/>
    <RadioGroup  defaultValue={placement} onChange={setPlacement}>
        
        </RadioGroup><Box padding={4} textAlign={"center"} zIndex={"sticky"} position={"fixed"} right={7} top={5} >
        <HStack>
        <Text id="currencyvalue" color={'black'} display={["none","block"]}></Text>
        <Button  colorScheme='blue' size={"sm"} onClick={onOpen} pos={"absolute"} right={0}>
            
           Currency
        </Button>
        </HStack>
        </Box>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px' textAlign={"center"}  >CURRENCY</DrawerHeader>
            <DrawerBody>
              <VStack  mb='4'>
              
  
    {
         Object.keys(currencydata).map((key) => {
            console.log(key)
            
          return(
           <Button colorScheme={"whatsapp"} width={"100%"} value={key} onClick={(e)=>{onClose();
            try{
               
                settypeofcurrency(key.toLowerCase());
                setloader(true);
                document.getElementById("currencyvalue").innerHTML=currency.symbols[key];
            }
            catch(e){
                console.log("anil")
            }
            
                
                

            }}></Button>)
        })
    } </VStack>
    </DrawerBody>
  </DrawerContent>
</Drawer>
    </>
    )}
  else if(typeoferror==="Network Error"){
    
    return(<Box display={"flex"} height={"80vh"} color={"red"} fontWeight={"extrabold"} justifyContent={"center"} alignItems={"center"}> Network Error Occured
  </Box>)
  }}
     return (
        
   
    loader?<Loader />:
  <>
<RadioGroup  defaultValue={placement} onChange={setPlacement}>
        
        </RadioGroup><Box padding={4} textAlign={"center"} zIndex={"sticky"} position={"fixed"} right={7} top={5} >
        <HStack>
        <Text id="currencyvalue" color={'black'} display={["none","block"]}></Text>
        <Button  colorScheme='blue' size={["xs","sm"]} onClick={onOpen} pos={"absolute"} right={0}>
            
           Currency
        </Button>
        </HStack>
        </Box>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px' textAlign={"center"} textColor={"white"}  >CURRENCY</DrawerHeader>
            <DrawerBody>
              <VStack  mb='4'>
              
  
    {
        Object.keys(currencydata).map((key) => {
          console.log(key)
            
          return(
           <Button colorScheme={"whatsapp"} width={"100%"} value={key} onClick={(e)=>{onClose();
            try{
                console.log(key)
                console.log(key.toLowerCase());
                settypeofcurrency(key.toLowerCase());
                setloader(true);
                document.getElementById("currencyvalue").innerHTML=key;
            }
            catch(e){
                console.log("anil")
            }
            
                
                

            }}>{key}</Button>)
        })
    } </VStack>
    </DrawerBody>
  </DrawerContent>
</Drawer>
        
  
   

 
    <>
        <Container  maxWidth={["container.xl"]}  paddingTop={"20px"} >
        
            <HStack flexWrap={"wrap"}  rowGap={10} columnGap={10} justifyContent={"center"}  >
         {data.map((value)=>{
          return ( 
            <>
          <Link  to ={`/coins/${value.name.toLowerCase()}`} class="bg-slate-200 pt-5 xl:h-[200px]  shadow-2xl hover:scale-110  cursor-pointer   rounded-md " >
            <VStack  width={"200px"}>
         <Image width={"60px"}  src={value.image} ></Image>
         <Box textColor={'black'} fontSize={"xl"}>{value.name}</Box>
         <Box color={"black"} >{value.current_price}</Box>
         </VStack>
        </Link></>)
         })       
            }
            
            </HStack>
            <br></br><Box display={'flex'} justifyContent="center">
             </Box>
            <br></br>  
            <PaginationComponent  />
        </Container>
        
</>

</>

  )
  
 
        };
        
  
        


export default Coins