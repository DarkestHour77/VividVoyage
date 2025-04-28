import axios from "axios"
import { useEffect, useState } from "react";

function Booking(){

    const [booking,setbooking]= useState([])

    useEffect(()=>{

        const startBooking = async() =>{
            try{
                const response = await axios.get('http://localhost:8080/flights/cities/booking')
                setbooking(response.data)
            }catch(error){
                console.error(error)
            }
        }
        startBooking();
    },[])

    return(
        <>
            <div className="booking">
                <div className="">
                    {booking.map(flight =>(
                        <div className="">
                            <div className="">
                                <p>{flight.origin} → {flight.destination} </p>
                            </div>
                            <div className="">
                                <p>{flight.departureTime} → {flight.arrivalTime} </p>
                            </div>
                            <div className="">
                                <p>{flight.flightName} → {flight.flightNumber} </p>
                            </div>
                            <div> ${flight.price} </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Booking;