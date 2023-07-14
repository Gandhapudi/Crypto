import React, {  useState } from "react";
import { Button,Container } from "@chakra-ui/react";
import "../styles/pagination.css"


function PaginationComponent() {
  const [data, setData] = useState([]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(100);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

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

    if ((currentPage - 1) % pageNumberLimit == 0) {
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

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

  return (
    <>
     
     <div id="pagination" >
      <ul className="pageNumbers " >
        <li>
          <Button colorScheme={"whatsapp"} size={["sm","md"]}
            onClick={handlePrevbtn}
            isDisabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </Button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <Button colorScheme={"whatsapp"}
            onClick={handleNextbtn}
            isDisabled={currentPage === pages[10 - 1] ? true : false}
           
          >
            Next
          </Button>
        </li>
      </ul>
      </div>
    </>
  );
}

export default PaginationComponent;