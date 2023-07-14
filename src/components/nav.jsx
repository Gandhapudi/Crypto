import React from 'react'
import { Button, Box, VStack, HStack } from '@chakra-ui/react'
import { Link } from "react-router-dom"


const Nav = () => {

  document.body.style.backgroundColor = "white"
  const Active = (e) => {
    let a = document.getElementsByClassName("active");
    for (const i of a) {
      i.style.backgroundColor = "black"
      i.style.color = "white"
    }
    e.target.style.transition = "0.6s"
    e.target.style.backgroundColor = "white"
    e.target.style.color = "black"
  }
  return (
    <>

      <HStack bg={'black'} justifyContent={"space-between"} padding={"20px"} position={"sticky"} top={0} width={"100%"} zIndex={"sticky"} overflow={"hidden"}   >
        <HStack >
          <Link to="/"><Button size={["xs", "md"]} bg={"white"} onClick={Active} className="active">Home </Button></Link>
          <Link to="/exchange"> <Button color="black" bg={"black"} textColor={"white"} size={["xs", "md"]} onClick={Active} className="active"  >Exchange </Button></Link>
          <Link to="/coin"> <Button color="black" bg={"black"} textColor={"white"} size={["xs", "md"]} onClick={Active} className="active"  > Coin</Button></Link></HStack>
        <HStack>
          <Link to="/login"><Button size={["xs", "md"]} bg={"black"} onClick={Active} textColor={"white"} className="active">Login </Button></Link>
          <Link to="/signup"><Button size={["xs", "md"]} bg={"black"} onClick={Active} textColor={"white"} className="active">SignUp </Button></Link>
        </HStack>
      </HStack>



    </>
  )
}

export default Nav