import Select from "react-select"
import Homepage from "./Homepage"

const options = [
    { value : "chocolate", label : "Oberoy"},
    { value : "vanilla", label : "Millenium Falcon"},
    { value : "strawberry", label : "Paradise"}
]


function Hotels(){
    return(
        <div>
            <div className="travel template">
                <div className="travel plan">
                    <div className="travel from">
                        <p>From</p>
                        <div class="select">
                            <Select
                                options = {options}
                                defaultValue={options[0]}
                            />
                        </div>
                    </div>
                    <div className="travel to">
                        <p>To</p>
                        <div class="select">
                            <Select
                                options = {options}
                                defaultValue={options[0]}
                            />
                        </div>
                    </div>
                    <div className="travel departure">
                        <p>Departure</p>
                        <div className="select">
                            <Select
                                options = {options}
                                defaultValue={options[0]}
                            />
                        </div>
                    </div>
                    <div className="travel return">
                        <p>Return</p>
                        <div class="select">
                            <Select
                                options = {options}
                                defaultValue={options[0]}
                            />
                        </div>
                    </div>
                </div>
            </div>
                    <div className="search button">
                        <button>SEARCH</button>
                    </div>
            <Homepage />
        </div>
    )
}

export default Hotels;