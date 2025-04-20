import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker"
import  axios  from "axios"

function Planes({onSidebarChange}){

    faker.seed(220);
    faker.locale = 'en_US';

    
    // const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [numberOfStops, setNumberOfStops] = useState([]);
    const [departure, setDeparture] = useState();
    const [arrival, setArrival] = useState();

    // const handleAirlineChange = (airline) =>{
        // setSelectedAirlines((prev)=>
        //     prev.includes(airline) ? prev.filter((a)=> a !== airline) : [...prev,airline]
        // )
    // }
    const handleStopsChange = (stop) =>{
        setNumberOfStops((prev)=>
            prev.includes(stop) ? prev.filter((s)=> s !== stop) : [...prev,stop]
        )
    }
    const handleDepartureChange = (e) =>{
        setDeparture(e.target.value)
    }
    const handleArrivalChange = (e) =>{
        setArrival(e.target.value)
    }


    const [selectedAirlines, setSelectedAirlines] = useState([]);
    

    const genrateAirline = (count) =>{
        return Array.from({length: count}, () =>({
            id:faker.string.uuid(),
            label:faker.airline.airline().name,
            checked:false,
            airport:faker.airline.airport().name,
        }));
    };

    useEffect(() =>{
        setSelectedAirlines(genrateAirline(7));
    },[])

    const handleToggle = (id) =>{
        setSelectedAirlines(selectedAirlines.map(air =>
            air.id === id ? {...air, checked: !air.checked} : air
        ))
    }
  

    const airplane = {
        airline:faker.airline.airline().name,
        // airport:faker.airline.airport().name,
        airport2:faker.airline.airport().name,
        flightNumber:`${faker.airline.airline().iataCode}${faker.airline.flightNumber({length: 4})}`
    }


    
    return(

       

        <div className="search-result">
        <div className="sidebar">
            <h2>Fliters</h2>

            <div className="airlines">
                <p>Airlines</p>
                {selectedAirlines.map((air) =>(
                    <div key={air.id} >
                        <input 
                            type="checkbox"
                            id={air.id}
                            checked={air.checked}
                            onChange={()=>handleToggle(air.id)}
                        />
                        <label for={air.id} >
                            {air.label}
                        </label>
                        
                    </div>
                ))}
            </div>
            
            <div className="stops">
                <p>Stops in Journey</p>
                {["Non Stop","1 Stop","1+ Stops"].map((stop)=>(
                    <label key={stop} >
                        <input 
                            type="checkbox"
                            name="stops"
                            value={stop}
                            checked={numberOfStops.includes(stop)}
                            onChange={()=>handleStopsChange(stop)}
                        />
                        {stop}
                    </label>
                ))}
            </div>

            <div class="traveltime">
                <div className="departure">
                    <p>Departure Time</p>
                    {["Before 6AM","6AM to 12PM","12PM to 6PM","After 6PM"].map((dep)=>(
                        <label key={dep} >
                            <input
                                type="radio"
                                name="departure"
                                value={dep}
                                checked={departure === dep}
                                onChange={handleDepartureChange}
                            />
                            {dep}
                        </label>
                    ))}
                </div>
                
                <div className="arrival">
                    <p>Arrival Time</p>
                    {["Before 6AM","6AM to 12PM","12PM to 6PM","After 6PM"].map((arr)=>(
                        <label key={arr} >
                            <input
                                type="radio"
                                name="arrival"
                                value={arr}
                                checked={arrival === arr}
                                onChange={handleArrivalChange}
                            />
                            {arr}
                        </label>
                    ))}
                </div>
            </div>
        </div>



        <div className="planes">
            {selectedAirlines.map(air=>(
                <div class="plane info">
                    <div class="column one">
                        <h5>{air.label}</h5>
                        <p>{airplane.flightNumber}</p>
                    </div>
                    <div class="column two">
                        <h5>
                            {/* {getTravelTime}              Not Working */}
                            8:55
                        </h5>
                        <p>{air.airport}</p>
                    </div>
                    <div class="column three">
                        <h5>02h 15m</h5>
                        <p>Non Stop</p>
                    </div>
                    <div class="column four">
                        <h5>11:10</h5>
                        <p>{airplane.airport2}</p>    
                    </div>
                    <div class="column five">
                        <h5>Rs 5,363</h5>
                        <p>per adult</p>
                    </div>
                </div>
            ))}    
        </div>
        </div>
    )
}
export default Planes;