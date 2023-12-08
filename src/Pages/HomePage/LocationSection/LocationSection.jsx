
const LocationSection = () => {

    return (
        <section className="my-10 px-32 py-20" data-aos="fade-left">
            <h2 className="text-4xl font-semibold text-center mb-5">Location and Address</h2>
            <div className="flex flex-col-reverse lg:flex-row-reverse justify-between gap-10">
                <figure className="w-1/2">
                    <img src={`https://i.ibb.co/0CWFftX/Screenshot-2023-11-29-124543.png`} className="w-full h-full rounded-lg" alt="" />
                </figure>
                <div className="flex flex-col justify-between text-justify text-slate-700">
                    <h3 className="text-2xl text-black">Address</h3>
                    <p className="text-cyan-700">Nilufa Foundation</p>
                    <p>393, Shadhinata Soroni, North Badda</p>
                    <p>Dhaka, Bangladesh-1212</p>
                    <p>Contact: <a className="text-cyan-800" href="tel:+8801795448106">+8801795448106</a> | Email: <a className="text-cyan-800" href="mailto:rafikk1998@gmail.com">rafikk1998@gmail.com</a></p>
                </div>
            </div>
        </section>
    )
}

export default LocationSection