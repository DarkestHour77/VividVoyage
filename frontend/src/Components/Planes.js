import { useEffect, useState } from "react";
import  axios  from "axios"
import moment from 'moment'
import { useNavigate } from "react-router-dom";

function Planes(){

    const navigate = useNavigate()

    
    const [flights, setFlights] = useState([])
    const [filteredFlights, setFilteredFlights] = useState([])
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [selectedStatus, setselectedStatus] = useState([]);
    const [departurePeriod, setDeparturePeriod] = useState();
    const [arrivalPeriod, setArrivalPeriod] = useState();

    useEffect(()=>{
        const search = localStorage.getItem("searchParams")
        const searchparse = JSON.parse(search)
        if(searchparse){
            setFlights(searchparse);

        }else{
            
            navigate("/login")
        }
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

   const handleSubmit = async(flight) =>{
        try{
            const response = await axios.post('http://localhost:8080/flights/cities/booking',{
                origin: flight.origin,
                destination: flight.destination,
                departureTime: flight.departureTime,
                arrivalTime: flight.arrivalTime,
                flightName: flight.flightName,
                flightNumber: flight.flightNumber,
                price: flight.price,

            })
        }catch(err){
            console.error(err)
        }finally{
            navigate('/flights/cities/booking')
        }
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
                        <label htmlFor={flight.flightName} >
                        <input 
                            type="checkbox"
                            id={flight.flightName}
                            // value={filterData}
                            checked={selectedAirlines.includes(flight.flightName)}
                            onChange={()=>handleAirlineChange(flight.flightName)}
                        />
                            {flight.flightName}
                        </label>
                        
                    </div>
                ))}
            </div>
            
            <div className="status">
                <p>Status Of Flights</p>
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
            <button
            className="sidebarButton"
            onClick={()=>{
                setSelectedAirlines([]);
                setselectedStatus([]);
                setDeparturePeriod("");
                setArrivalPeriod("")
            }}>Reset</button>
        </div>

        <div className="planes">
            {filteredFlights.length > 0 ?(
            filteredFlights.map((flight, i)=>(
                <div>
                    <div class="plane info" key={flight.id }>
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
                         <button onClick={()=> handleSubmit(flights[i])}  >Booking</button>
                    </div>
                    <hr />
                </div>
            ))   
        ): (
            <div className="noflights">
                <p>No Flights match your Filter!</p>
            </div>
        )}
        </div>

        </div>
    )
}
export default Planes;