import axios from "axios"
import { useEffect, useState } from "react";
import moment from "moment"

function Dashboard(){

    const [booking,setbooking]= useState([])

    useEffect(()=>{

        const startBooking = async() =>{
            try{
                const response = await axios.get('http://localhost:8080/flights/cities/booking',{
                    headers:{
                        'Authorization': "bearer " + localStorage.getItem("token"),
                    }
                })
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
                <div className="allbookings">
                    {booking.map(flight =>(
                        <div className="bookingdata">
                            <div className="bookingflightroute">
                                <p>{flight.origin} → {flight.destination} </p>
                            </div>
                            <div className="bookingflighttime">
                                <p>{ moment(flight.departureTime).format('MMMM Do YYYY, h:mm a')} → { moment(flight.arrivalTime).format('MMMM Do YYYY, h:mm a')} </p>
                            </div>
                            <div className="bookingflightdetails">
                                <p>{flight.flightName} → {flight.flightNumber} </p>
                            </div>
                            <div className="bookingflightprice"> ${flight.price} </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Dashboard;