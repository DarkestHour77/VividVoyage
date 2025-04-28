import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Slickslider() {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
  };
  return (
    <div class="slick">
        <h1>Wonders Of India</h1>
        <div className="slider-container">
          <Slider {...settings}>
          <div>
              <p>
              <img src="/offer1.webp" alt=""/>
              </p>
            </div>
            <div>
              <p>
              <img src="/offer1.webp" alt=""/>
              </p>
            </div>
            <div>
              <p>
              <img src="/offer1.webp" alt=""/>
              </p>
            </div>
            <div>
              <p>
              <img src="/offer1.webp" alt=""/>
              </p>
            </div>
            <div>
              <p>
              <img src="/offer1.webp" alt=""/>
              </p>
            </div>
        
          </Slider>
        </div>
    </div>
  );
}

export default Slickslider;
