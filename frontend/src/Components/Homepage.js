
import Offers from "./Offers";
import Slickslider from "./Slickslider";


function Homepage (){
    return(
        <>
        <Offers />

        <div className="advert">
        <img src="/offer1.webp" alt=""/>
        <div className="advert-details">
                <h1>Experience <spam>Emirates Airline</spam> with VividVoyage</h1>
                <p>Redefine Elegance in the Skies With Our Premium Airline Partner</p>
            </div>
        </div>

        <div className="advert">
            <div class="advert-tag">
                <h1>Flagship Hotel Stores on VividVoyage</h1>
            </div>
            <div class="advert-hotels">
                <img src="/offer1.webp" alt=""/>
                <img src="/offer1.webp" alt=""/>
                <img src="/offer1.webp" alt=""/>
            </div>
        </div>
        

        <Slickslider />
        </>
    )
}

export default Homepage;



