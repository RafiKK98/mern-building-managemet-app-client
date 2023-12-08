import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import Swal from 'sweetalert2';
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { motion } from "framer-motion";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async data => {
        console.log(data.name, data.email, data.password, data.image[0]);
        const imageFile = { image: data.image[0] }
        const imgRes = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (imgRes.data.success) {
            const photoUrl = imgRes.data.data.display_url;
            createUser(data.email, data.password)
                .then(result => {
                    const loggedUser = result.user;
                    console.log(loggedUser);
                    updateUserProfile(data.name, photoUrl)
                        .then(() => {
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                role: 'user'
                            };
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        console.log('user added to the database')
                                        reset();
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'User created successfully.',
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        navigate('/');
                                    }
                                })
                        })
                })
                .catch(error => {
                    console.warn(`Error: ${error.code}, ${error.message}`);
                })
        }
    }


    return (
        <>
            <Helmet>
                <title>Nilufa Foundation | Sign up</title>
            </Helmet>
            <motion.section 
                className="py-20 px-10 "
                initial={{x: 500, opacity: 0.1}}
                animate={{x: 0, opacity: 1}}
                transition={{duration: 1}}
                >
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-semibold">Welcome!</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your user name</label>
                        <input type="text" id="name" {...register("name", { required: true})} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="user name" />
                        {errors.name && <span className="mt-2 text-sm font-medium text-red-600">Name is required</span>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input type="email" id="email" {...register('email', { required: true})} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="youremail@email.com" />
                        {errors.email && <span className="mt-2 text-sm font-medium text-red-600">Email is required</span>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="user_avatar" className="block mb-2 text-sm font-medium text-gray-900">Upload image</label>
                        <input type="file" {...register('image', { required: true })} className="file-input file:bg-cyan-600 file:hover:bg-cyan-800 file:border-0 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" aria-describedby="user_avatar_help" id="user_avatar" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <input type="password" id="password" {...register('password', { 
                            required: true, 
                            minLength: 6, 
                            maxLength: 20,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })} name="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        {errors.password?.type === 'required' && <p className="mt-2 text-sm font-medium text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="mt-2 text-sm font-medium text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="mt-2 text-sm font-medium text-red-600">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="mt-2 text-sm font-medium text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                        </div>
                        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900">I agree with the <a href="#" className="text-cyan-600 hover:underline">terms and conditions</a></label>
                    </div>
                    <input type="submit" value="Register" className="text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" />
                    <p className="text-sm font-light text-gray-600 mt-5">
                        Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline">Login here</Link>
                    </p>
                    <div className="divider">
                        <span className="font-medium text-gray-600">OR</span>
                    </div>
                    <SocialLogin />
                </form>
            </motion.section>
        </>
        
    )
}

export default Register