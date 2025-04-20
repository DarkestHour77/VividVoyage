// import  Router  from "./Components/Router";
import './App.css';
// import Homepage from './Components/Homepage';
import Navbar from './Components/Router';
import { useState } from "react";
// import Flights from "./Components/Flights";

function App() {

  const [comp, setcomp] = useState();

  return (
    <div className="App">
      <Navbar />
      {/* <Flights /> */}
      {/* <Homepage /> */}
    </div>
  );
}

export default App;
