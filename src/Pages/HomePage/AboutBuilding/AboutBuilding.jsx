
const AboutBuilding = () => {
    return (
        <div className="my-10 px-32 py-20 bg-cyan-100" data-aos="fade-right">
            <h2 className="text-4xl font-semibold text-center mb-10">About our Building</h2>
            <div className="flex flex-col lg:flex-row gap-10">
                <figure className="w-1/2">
                    <img src={`https://i.ibb.co/2yShHGG/building-banner-photo.jpg`} className="w-full h-full rounded-lg" alt="" />
                </figure>
                <div className="flex flex-col justify-between w-1/2">
                    <h2 className="text-3xl font-semibold">
                        <span className="text-cyan-700">Nilufa</span> Foundation
                    </h2>
                    <p className="text-slate-700 text-justify">
                        Welcome to Nilufa Foundation, where modern luxury meets community living. 
                        Our state-of-the-art facility offers a range of amenities, from a refreshing 
                        swimming pool in the rooftop to well-spaced garage spaces. Nestled in a prime location, 
                        our building provides easy access to essential services. Experience comfort, 
                        security, and a vibrant community at Nilufa Foundation.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutBuilding