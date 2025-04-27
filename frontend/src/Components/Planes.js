import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker"
import  axios  from "axios"
import moment from 'moment'

function Planes({onSidebarChange}){

    
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [selectedStatus, setselectedStatus] = useState([]);
    const [departurePeriod, setDeparturePeriod] = useState();
    const [arrivalPeriod, setArrivalPeriod] = useState();

    //////////////////////////////////////////////////

    const [flights, setFlights] = useState([])
    const [filterData, setFilterData] = useState()
    const [filteredFlights, setFilteredFlights] = useState([])

    useEffect(()=>{
        const search = localStorage.getItem("searchParams")
        const searchparse = JSON.parse(search)
      console.log(searchparse)
      setFlights(searchparse);
    //   applyFilters()
    //   setFilteredFlights(searchparse)
    },[])

    useEffect(()=>{
       applyFilters();
    },[flights, selectedAirlines, selectedStatus, departurePeriod, arrivalPeriod ])

    const handleAirlineChange = (flightName) => {
        if (selectedAirlines.includes(flightName)) {
            setSelectedAirlines(selectedAirlines.filter(name => name !== flightName));
        } else {
            setSelectedAirlines([...selectedAirlines, flightName]);
        }
    };
    
    const handleStatusChange = (status) =>{
        if(selectedStatus.includes(status)){
            setselectedStatus(selectedStatus.filter(s=> s !== status))
        }else{
            setselectedStatus([...selectedStatus, status])
        }
    }
    const handleDepartureChange = (period) =>{
        setDeparturePeriod(period)
    }
    const handleArrivalChange = (period) =>{
        setArrivalPeriod(period)
    }
    
    const applyFilters = () =>{
        let result = [...flights];

        if(selectedAirlines.length > 0){
            result = result.filter(flight => selectedAirlines.includes(flight.flightName))
        }
        console.log(result)

        if(selectedStatus.length > 0 ){
            result = result.filter(flight => selectedStatus.includes(flight.status))
        }
        if(departurePeriod){
            result = result.filter(flight => isTimeInPeriod(flight.departureTime, departurePeriod))
        }
        if(arrivalPeriod){
            result = result.filter(flight => isTimeInPeriod(flight.arrivalTime, arrivalPeriod))
        }

        setFilteredFlights(result);
    }
    
    const isTimeInPeriod = (time,period) =>{
        const hour = moment(time).hour();

        switch (period){
            case "Before 06:00":
                return hour < 6;
            case "06:00 to 12:00":
                return hour >= 6 && hour < 12;
            case "12:00 to 18:00":
                return hour >= 12 && hour < 18;
            case "After 18:00":
                return hour >= 18;
            default:
                return true;
        }
    }

    const calculateDuration = (departure, arrival) =>{
        const start = moment(departure);
        const end = moment(arrival)
        const duration = moment.duration(end.diff(start))
        const hours = duration.hours()
        const minutes = duration.minutes();
        return `${hours}h ${minutes}m`;
   }
       
   const timePeriods = ["Before 06:00", "06:00 to 12:00", "12:00 to 18:00", "After 18:00"] 

    return(

       

        <div className="search-result">
        <div className="sidebar">
            <h2>Fliters</h2>

            <div className="airlines">
                <p>Airlines</p>
                {flights.map((flight) =>(
                    <div key={flight.flightName} >
                        <input 
                            type="checkbox"
                            id={flight.flightName}
                            // value={filterData}
                            checked={selectedAirlines.includes(flight.flightName)}
                            onChange={()=>handleAirlineChange(flight.flightName)}
                        />
                        <label htmlFor={flight.flightName} >
                            {flight.flightName}
                        </label>
                        
                    </div>
                ))}
            </div>
            
            <div className="status">
                <p>Stops in Journey</p>
                {flights.map((flight)=>(
                    <label key={flight.status} >
                        <input 
                            type="checkbox"
                            name="status"
                            value={flight.status}
                            checked={selectedStatus.includes(flight.status)}
                            onChange={()=>handleStatusChange(flight.status)}
                        />
                        {flight.status}
                    </label>
                ))}
            </div>

            <div class="traveltime">
                <div className="departure">
                    <p>Departure Time</p>
                    {timePeriods.map((period)=>(  
                        <label key={`departure-${period}`} >
                            <input
                                type="radio"
                                name="departureTime"
                                id={`departure-${period}`}
                                value={period}
                                checked={departurePeriod === period}
                                onChange={()=> handleDepartureChange(period)}
                            />
                            {period}
                        </label>
                    ))}
                </div>
                
                <div className="arrival">
                    <p>Arrival Time</p>
                    {timePeriods.map((period)=>(
                        <label key={`arrival-${period}`} >
                            <input
                                type="radio"
                                id={`arrival-${period}`}
                                name="arrival"
                                value={period}
                                checked={arrivalPeriod === period}
                                onChange={()=> handleArrivalChange(period)}
                            />
                            {period}
                        </label>
                    ))}
                </div>
            </div>
            <button onClick={()=>{
                setSelectedAirlines([]);
                setselectedStatus([]);
                setDeparturePeriod("");
                setArrivalPeriod("")
            }}>Reset</button>
        </div>




        <div className="planes">
            {filteredFlights.length > 0 ?(
            filteredFlights.map(flight=>(
                <div class="plane info" key={flight.id || flight.fl}>
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
            ))   
        ): (
            <div>
                <p>No Flights match your Filter!</p>
            </div>
        )}
        </div>

        </div>
    )
}
export default Planes;