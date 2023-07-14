import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Nav from "./components/nav";
import Home from "./components/home"
import Coins from "./components/coins";
import Exchange from "./components/exchange"
import Coin from "./components/coin";
import Login from "./components/login";
import Signup from "./components/signup";
import Footer from "./components/footer";
function App() {
  return (
  <>
    <Router>
      <Nav  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Exchange" element={<Exchange />} />
        <Route path="/coin" element={<Coins />} />
        <Route path="/coins/:id" element={<Coin  />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes >
      <Footer />
    </Router>
  </>
  );
}

export default App;
