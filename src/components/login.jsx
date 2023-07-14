import { Container, VStack,Text, Input, Box, HStack, Button, InputGroup, InputRightElement,useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeDropper, FaEyeSlash, FaFacebook, FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Login = () => {
       const toast = useToast()
        const [show, setShow] = useState(false)
        const handleClick = () => setShow(!show)
        function checking(e){
            
          let email=document.getElementById("emailinput").value
          let password=document.getElementById("passwordinput").value
          let emailerror=document.getElementById("email")
             if(email==""){
                    document.getElementById("email").style.display="block";
                    document.getElementById("email").innerHTML="Enter Email address"
                }
                
                else if(!email.includes("@")){
                    document.getElementById("email").style.display="block";
                    document.getElementById("email").innerHTML="Enter valid Email address"
                   
                }
                else{
                    document.getElementById("email").style.display="none";
                    document.getElementById("email").innerHTML=" "
                }
                if(password==""){
                    document.getElementById("password").style.display="block";
                    document.getElementById("password").innerHTML="Enter Password"
                }
                else if (password!="" && email!="" && email.includes("@")){
                    document.getElementById("password").style.display="none";
                    
                    toast({
                        title: 'Succesfully',
                        description: "Logged in",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                        position:"top"
                      })
                      window.location.href="/"
                     
                    
                }
                
             }
        
        const [logindata,setlogindata]=useState({
            email:"",
            password:"",
        })
        useEffect(()=>{
              console.log(logindata)
        },[logindata])
  return (
    <>
    <br></br>
    <br></br>
    <Container display={"flex"} bgColor={"whiteAlpha.600"}  shadow={"dark-lg"} rounded={"2xl"}  maxWidth={["100%","70%","40%","30%"]} > 
    <VStack width={"100%"} justifyContent={"flex-start"}>
    <Text textAlign={"center"} paddingBottom={"4"} width={"100%"} fontSize={"2xl"} fontWeight={"extrabold"}>Login</Text>

    <VStack justifyContent={"flex-start"} width={"100%"}>
    <Text fontSize={"md"} width={"100%"} fontWeight={"semibold"}  textAlign={"start"}>Email</Text>
    <Input  id="emailinput" size={"sm"} outlineOffset={"0px"} name="email"  focusBorderColor={"null"}  outlineColor={"black"} placeholder='Email' type='email'></Input>
    <Text id="email" display={"none"} color={"red"} width={"100%"}></Text>
    <Text  fontSize={"md"} fontWeight={"semibold"} width={"100%"}  textAlign={"start"}>Password</Text>
    <InputGroup   >
      <Input id="passwordinput" 
      size={"sm"}
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        outlineOffset={"0px"} focusBorderColor={"null"}  outlineColor={"black"}
      />
      
      <InputRightElement  height={"100%"}>
        <Button type={"submit"} h='1.75rem' size='sm' onClick={handleClick}>
          {show ? <FaEye /> : <FaEyeSlash/>}
        </Button>
      </InputRightElement>
    </InputGroup>
   
    <Text id="password" display={"none"} color={"red"} width={"100%"}></Text>
    <br>
    </br>
    <HStack justifyContent={"flex-end"} width={"100%"} textDecoration={"underline"} >
        <Link  to={"/signup"}>Signup</Link>
        <Link to={"/forgetpassword"}>Forget password</Link>

    </HStack>
    <br></br>
    <Button onClick={checking} width={"100%"} colorScheme={"whatsapp"}>Login</Button>
    
    <br></br>
    
    <VStack borderTopWidth={"medium"} width={"100%"} borderTopColor={"black"}>
        <br></br>
        <Text>or</Text>
        <br></br>
        <HStack width={"100%"} justifyContent={"space-evenly"} >
         <Button colorScheme={"whatsapp"}> <a href='https://www.google.com/'> <FaGoogle  size={"30px"}/></a></Button> 
         <Button colorScheme={"linkedin"}> <a href="https://www.linkedin.com/"><FaLinkedin size={"30px"}/></a></Button>
         <Button colorScheme={"facebook"}> <a href="https://www.facebook.com/"><FaFacebook size={"30px"}/></a></Button>
         <Button colorScheme={"green"}> <a href="https://www.github.com/"> <FaGithub size={"30px"}/></a></Button>
        </HStack>
        <br></br>
        <br></br>
    </VStack>


    </VStack>
    </VStack>
    </Container>
    <br></br>
    <br></br>
    
    </>
  )
}

export default Login