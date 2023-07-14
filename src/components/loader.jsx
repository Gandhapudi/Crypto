import { Button,Box } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    < >
    <div class="flex w-[100%] h-[100vh] justify-center items-center">
    <div class="w-[40px] h-[40px] rounded-full border-[5px] border-r-green-400 border-b-green-400 animate-spin" ></div></div>
    </>
  )
}

export default Loader;