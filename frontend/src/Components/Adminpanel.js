import { useEffect, useState} from "react"
import { Search, Plus, Edit, Trash2, Save, X, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const getFlights = async () => {
    try{
        const response = await axios.get('http://localhost:8080/admin/adminpanel')
        return response.data;
    }catch(error){
        throw new Error('Network response was not ok');
    }
}
const createFlight = async (flightData) => {
    try{
        const response = await axios.post('http://localhost:8080/admin/adminpanel',flightData)
        return response.data;
    }catch(error){
        throw new Error ("Failed to create the Flight")
    }
}
const updateFlight = async (id, flightData) => {
    try{
        const response = await axios.put(`http://localhost:8080/admin/adminpanel/${id}`, flightData)
        return response.data
    }catch(error){
        throw new Error ("Failed to update the Flight")
    }
}
const deleteFlight = async (id) =>{
    try{
        const response = await axios.delete(`http://localhost:8080/admin/adminpanel/${id}`)
        return response.data
    }catch(error){
        throw new Error ("Failed to delete the Flight")
    }
} 




function Adminpanel() {

    const navigate = useNavigate()

   
    const[flights,setFlights] = useState([]);
    const[filterflights, setFilterflights] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editing, setEditing] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        flightNumber: '',
        flightName: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        status: 'Scheduled'
    });

    const loadFlights = async () =>{
        setIsLoading(true);
        try{
            const data = await getFlights();
            setFlights(data);
            setFilterflights(data);
        }catch(err){
            console.error("Error loading flights", err);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadFlights();
        const isAdmin = localStorage.getItem("isAdmin")
        const isAdminParse = JSON.parse(isAdmin)
        if(!isAdminParse){
           navigate('/flights/')
        }
    }, []);
    
    useEffect(()=>{
        if(!searchTerm.trim()){
            setFilterflights(flights);
            return;
        }
        
        const results = flights.filter(flights =>
            flights.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            flights.flightName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            flights.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            flights.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            flights.status.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
        setFilterflights(results)
    },[searchTerm, flights]);
    
    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setFormData(prevData=> ({...prevData, [name]:value}))
    }

    const handleAddFlights = async () => {
        try{
            setIsLoading(true);
            const newFlight = await createFlight(formData)
            setFlights([...flights, newFlight]);
            setShowAddForm(false);
            setFormData({
                flightNumber: '',
                flightName: '',
                origin: '',
                destination: '',
                departureTime: '',
                arrivalTime: '',
                price: '',
                status: 'Scheduled'
            });
        }catch(err){
            console.error("Error adding flight", err)
        }finally{
            setIsLoading(false);
        }
    } 

    const handleEditClick = (flight) =>{
        setEditing(flight._id)

        const formattedFlight = {
            ...flight,
            departureTime: formatDateForInput(flight.departureTime),
            arrivalTime: formatDateForInput(flight.arrivalTime)
        }
        setFormData(formattedFlight);
    }

    const handleUpdateFlight = async () => { 
        try{
            setIsLoading(true);
            const updatedFlight = await updateFlight(editing, formData) 
            setFlights(flights.map(flight => 
                flight._id === editing ? updatedFlight : flight
            ))
            setFilterflights(filterflights.map(flight =>
                flight._id === editing ? updatedFlight : flight
            ))
            setEditing(null)
        }catch(err){
            console.error('Error updating flight', err)
        }finally{
            setIsLoading(false)
        }
    }

    const handleDeleteFlight = async(id) =>{

        if(window.confirm('Are you sure you wanna delete this Flight')){

            try{
                setIsLoading(true);
                await deleteFlight(id)
                setFlights(flights.filter(flight => flight._id !== id ))
                setFilterflights(filterflights.filter(flight => flight._id !== id))
            }catch(err){
                console.error("Error deleting flight",err)
            }finally{
                setIsLoading(false)
            }
        }
    }

    const cancelEdit = () =>{
        setEditing(null)
    }

    const cancelAdd = () =>{
        setShowAddForm(false)
        setFormData({
            flightNumber: '',
            flightName: '',
            origin: '',
            destination: '',
            departureTime: '',
            arrivalTime: '',
            price: '',
            status: 'Scheduled'
        })
    }

    const formatDateForInput = (dateString) =>{
        const date = new Date(dateString);
        return date.toISOString().slice(0,16);
    }

    const formatDateTime = (dateTimeStr) =>{
        const date = new Date(dateTimeStr);
        return new Intl.DateTimeFormat('en-us',{
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true            
        }).format(date)
    }

    const refreshData = () =>{
        loadFlights();
    }


   return(
        <div>
            <div className="adminpanelheader">
                <h2>Flight Management Admin Panel</h2>
            </div>    
            {/* Search bar and Button */}
            <div className="">
                <div className="searchbar">
                    <input 
                        type="text"
                        placeholder="Search Flight..."
                        value={searchTerm}
                        onChange={(e)=> setSearchTerm(e.target.value)}
                    />
                    <Search size={18} />
                </div>
                <div className="">
                    <button 
                        onClick={refreshData}
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                    <button 
                        onClick={()=>setShowAddForm(true)}
                        disabled={showAddForm}
                    >
                        <Plus size={18} />
                        Add Flights
                    </button>
                </div>

            </div>

           { /* Add form */}
           {showAddForm &&(
            <div className="">
                <div className="">
                    <h2 >Add New Flights</h2>
                    <button onClick={cancelAdd} >
                        <X size={18} />
                    </button>
                </div>
                <div className="">
                    <div className="">
                        <label>Flight Number</label>
                        <input
                            type="text"
                            name="flightNumber"
                            value={formData.flightNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="">
                        <label>Flight Name</label>
                        <input
                            type="text"
                            name="flightName"
                            value={formData.flightName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="">
                        <label>Origin</label>
                        <input
                            type="text"
                            name="origin"
                            value={formData.origin}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="">
                        <label>Destination</label>
                        <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="">
                        <label>Departure Time</label>
                        <input
                            type="datetime-local"
                            name="departureTime"
                            value={formData.departureTime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="">
                        <label>Arrival Time</label>
                        <input
                            type="datetime-local"
                            name="arrivalTime"
                            value={formData.arrivalTime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="">
                        <label>Price ($)</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="">
                        <label>Status</label>
                        <select 
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="Scheduled">Scheduled</option>
                            <option value="On Time">On Time</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button onClick={cancelAdd}>Cancel</button>
                    <button onClick={handleAddFlights}>Add Flights</button>
                </div>
            </div>
            )}

            {/* Flight Table */}
            <div className="">
                {isLoading ? (
                    <div>
                        <RefreshCw size={25} />
                    </div>
                ) : filterflights.length === 0 ?(
                    <p>No Flights found matching your criteria</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Flight</th>
                                <th>Route</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterflights.map(flight =>(
                                <tr key={flight._id}>
                                    {editing === flight._id ?(
                                        <>
                                            <td>
                                                <input 
                                                    type="text"
                                                    name="flightNumber"
                                                    value={formData.flightNumber}
                                                    onChange={handleInputChange}
                                                /> 
                                                <input
                                                    type="text"
                                                    name="flightName"
                                                    value={formData.flightName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <div>
                                                    <input 
                                                        type="text"
                                                        name="origin"
                                                        value={formData.origin}
                                                        onChange={handleInputChange}
                                                    /> 
                                                    <span>→</span>
                                                    <input 
                                                        type="text"
                                                        name="destination"
                                                        value={formData.destination}
                                                        onChange={handleInputChange}
                                                    /> 
                                                </div>
                                            </td>
                                            <td>
                                                <input 
                                                    type="datetime-local"
                                                    name="departureTime"
                                                    value={formData.departureTime}
                                                    onChange={handleInputChange}
                                                /> 
                                            </td>
                                            <td>
                                                <input 
                                                    type="datetime-local"
                                                    name="arrivalTime"
                                                    value={formData.arrivalTime}
                                                    onChange={handleInputChange}
                                                /> 
                                            </td>
                                            <td>
                                                <input 
                                                    type="number"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                /> 
                                            </td>
                                            <td>
                                                <select 
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="Scheduled">Scheduled</option>   
                                                    <option value="on Time">On Time</option> 
                                                    <option value="Delayed">Delayed</option>
                                                    <option value="Cancelled">Cancelled</option>  
                                                </select>
                                            </td>
                                            <td>
                                                <button onClick={handleUpdateFlight} >
                                                    <Save size={18} />
                                                </button>
                                                <button onClick={cancelEdit} >
                                                    <X size={18} />
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{flight.flightNumber}</td>
                                            <td>{flight.flightName}</td>
                                            <td>{flight.origin} → {flight.destination}</td>
                                            <td>{formatDateTime(flight.departureTime)}</td>
                                            <td>{formatDateTime(flight.arrivalTime)}</td>
                                            <td>${flight.price}</td>
                                            <td>
                                                <span >  {/* might need to delete */}

                                                {flight.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button onClick={()=> handleEditClick(flight)}>
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={()=> handleDeleteFlight(flight._id)}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    )
}

export default Adminpanel;