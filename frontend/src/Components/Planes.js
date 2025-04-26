import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker"
import  axios  from "axios"
import moment from 'moment'

function Planes({onSidebarChange}){

    
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [status, setStatus] = useState([]);
    const [departure, setDeparture] = useState();
    const [arrival, setArrival] = useState();

    //////////////////////////////////////////////////

    const [flights, setFlights] = useState([])
    const [filterData, setFilterData] = useState()

    useEffect(()=>{
        const search = localStorage.getItem("searchParams")
        const searchparse = JSON.parse(search)
      console.log(searchparse)
      setFlights(searchparse);
    },[])

    useEffect(()=>{
        const result = flights.filter(flight=>
            flight.flightName.includes(filterData )
        )
        setFilterData(result)
    },[filterData])
    
   const calculateDuration = (departure, arrival) =>{
        const start = moment(departure);
        const end = moment(arrival)
        const duration = moment.duration(end.diff(start))
        const hours = duration.hours()
        const minutes = duration.minutes();
        return `${hours}h ${minutes}m`;
   }
       
    
    return(

       

        <div className="search-result">
        <div className="sidebar">
            <h2>Fliters</h2>

            <div className="airlines">
                <p>Airlines</p>
                {flights.map((flight) =>(
                    <div key={flight.id} >
                        <input 
                            type="checkbox"
                            id={flight.id}
                            value={filterData}
                            onChange={(e)=>setFilterData(e.target.value)}
                        />
                        <label for={flight.id} >
                            {flight.flightName}
                        </label>
                        
                    </div>
                ))}
            </div>
            
            <div className="stops">
                <p>Stops in Journey</p>
                {flights.map((flight)=>(
                    <label key={flight.id} >
                        <input 
                            type="checkbox"
                            name="status"
                            value={flight.status}
                            // checked={status.includes(flight.status)}
                            // onChange={()=>handleStopsChange(stop)}
                        />
                        {flight.status}
                    </label>
                ))}
            </div>

            <div class="traveltime">
                <div className="departure">
                    <p>Departure Time</p>
                    {selectedAirlines.map((dep)=>(  
                        <label key={dep} >
                            <input
                                type="radio"
                                name="departureTime"
                                value={dep}
                                checked={departure === dep}
                                // onChange={handleDepartureChange}
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
                                // onChange={handleArrivalChange}
                            />
                            {arr}
                        </label>
                    ))}
                </div>
            </div>
        </div>



        <div className="planes">
            {flights.map(flight=>(
                <div class="plane info">
                    <div class="column one">
                        <h5>{flight.flightName}</h5>
                        <p>{flight.flightNumber}</p>
                    </div>
                    <div class="column two">
                        <h5>{moment(flight.departureTime).format('HH:mm')} </h5>
                        <p>{flight.origin}</p>
                    </div>
                    <div class="column three">
                        <h5>{calculateDuration(flight.departureTime, flight.arrivalTime)}</h5>
                        <p>{flight.status}</p>
                    </div>
                    <div class="column four">
                        <h5>{moment(flight.arrivalTime).format('HH:mm')}</h5>
                        <p>{flight.destination}</p>    
                    </div>
                    <div class="column five">
                        <h5>Price</h5>
                        <p>${flight.price}</p>
                    </div>
                </div>
            ))}    
        </div>

        </div>
    )
}
export default Planes;