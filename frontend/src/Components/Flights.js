import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fakerEN_US as faker } from "@faker-js/faker"
import axios from "axios"


function Flights(){

    const Navigate = useNavigate();
    
    // faker.seed(220);
    // const ci

    // const cities = useMemo(() => {
    //     const cityset = new Set();

    //     while(cityset.size < 100){
    //         cityset.add(faker.location.city());
    //     }

    //     return Array.from(cityset);
    // },[])

    const [selectedFromCity, setSelectedFromCity] = useState("");
    const [selectedToCity, setSelectedToCity] = useState("");
    const [departDate, setDepartDate] = useState("");
    const [returnDate, setReturnDate] = useState("");


    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:8080/flights/cities',{
                    origin: selectedFromCity,
                    destination: selectedToCity,
                    departureTime: departDate,
                    arrivalTime: returnDate,
            },{
                headers:{
                    'Authorization': "bearer " + localStorage.getItem("token"),
                }
            });

            localStorage.setItem("searchParams", JSON.stringify(response.data))

        }catch (err)  {
            console.error(err);
          }

          Navigate("/flights/cities")
    }

   
    

    return(
        <>
        <div className="travel template">
            <div className="travel plan">
                <div className="travel from">
                    <p>From</p>
                    <div class="select">
                        
                        <select 
                            id="origin"
                            name="origin"
                            value={selectedFromCity}
                            onChange={(e)=> setSelectedFromCity(e.target.value)}
                        >
                            <option value="">-- Choose a city --</option>
                            {['Mumbai', 'Delhi', 'Kolkata'].map((city,index) => (
                                <option key={index} value={city}  >
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="travel to">
                    <p>To</p>
                    <div class="select">
                    <select 
                            id="destination"
                            name="destination"
                            value={selectedToCity}
                            onChange={(e)=> setSelectedToCity(e.target.value)}
                        >
                            <option value="">-- Choose a city --</option>
                            {['Delhi', 'Mumbai', 'Kolkata'].map((city,index) => (
                                <option key={index} value={city}  >
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="travel depart">
                    <p>Departure</p>
                    <div className="select">
                        <input 
                            type="date"
                            id="departureTime"
                            name="departureTime"
                            value={departDate}
                            onChange={(e)=> setDepartDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="travel return">
                    <p>Return</p>
                    <div class="select">
                       <input
                            type="date"
                            id="arrivalTime"
                            name="arrivalTime"
                            value={returnDate}
                            onChange={(e)=> setReturnDate(e.target.value)}
                        /> 
                    </div>
                </div>
            </div>
        </div>
            <div className="search button">
                <button type="button" className="searchbutton" onClick={handleSubmit}>
                    SEARCH
                </button>
            </div>
        </>
    )
}

export default Flights