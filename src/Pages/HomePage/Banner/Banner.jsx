import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        // Change the following with apartment pictures
        <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>
            <div className="h-[700px]">
                <img className="h-full" src={`https://i.ibb.co/TLwrjvj/apartment8.jpg`} />
            </div>
            <div className="h-[700px]">
                <img className="h-full" src={`https://i.ibb.co/3SVdqyb/apartment3.jpg`} />
            </div>
            <div className="h-[700px]">
                <img className="h-full" src={`https://i.ibb.co/X8Nfmw1/apartment2.jpg`} />
            </div>
        </Carousel>
    )
}

export default Banner