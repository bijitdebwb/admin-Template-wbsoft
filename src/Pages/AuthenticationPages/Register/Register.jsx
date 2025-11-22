import { useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router';
import Logo from "../../../assets/logo/logo.png";
import RegisterImg from "../../../assets/Auth/Register.png";
import RegisterImgDark from "../../../assets/Auth/Register_dark.png";


const Register = () => {
    const [theme] = useState(localStorage.getItem("theme") || "light");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        // Handle login logic here
    }

    return (
        <div className="flex items-center bg-base-100">
            {/* Left Illustration */}
            <div className="hidden lg:flex lg:flex-col items-center justify-center relative lg:w-8/12">
                <img
                    src={
                        theme === "light" ?
                            RegisterImg
                            : RegisterImgDark
                    }
                    alt="Login image"
                    className="max-w-lg 2xl:max-w-xl h-auto object-cover"
                />
            </div>

            {/* Right Login Card */}
            <div className="h-screen flex items-center justify-center bg-base-200  p-10 w-full lg:w-4/12">
                <div className="w-full max-w-md space-y-6">
                    {/* Logo */}
                    <Link to="/">
                        <img
                            className="w-32 h-12 mx-auto mb-4"
                            src={Logo}
                            alt="Logo"
                        />
                    </Link>

                    {/* Title */}
                    <div>
                        <h2 className="auth_headertext ">
                            Adventure starts here 🚀
                        </h2>
                        <p className="text-primary-content">
                            Make your app management easy and fun!
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="labelClass ">
                                Username
                            </label>
                            <input
                                autoFocus
                                id="username"
                                type="text"
                                placeholder="johndoe"
                                name="username"
                                className="inputClass"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="labelClass">
                                Email
                            </label>
                            <input
                                autoFocus
                                id="email"
                                type="email"
                                placeholder="johndoe@email.com"
                                name="email"
                                className="inputClass"
                            />
                        </div>

                        {/* Password with Show/Hide */}
                        <div>
                            <label className="labelClass ">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="•••••••••••"
                                    name="password"
                                    className="inputClass"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="passwordIcon"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2">
                                <input className="checkbox bg-base-200" type="checkbox" />
                                <p className="h-full">
                                    I agree to{" "}
                                    <Link
                                        to="forgot-password"
                                        className="linkClass"
                                    >
                                        privacy policy & terms
                                    </Link>
                                </p>
                            </label>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full py-2 btn transition"
                        >
                            Register
                        </button>
                    </form>

                    {/* Sign in */}
                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="../login" className="linkClass">
                            Sign in instead
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="flex items-center">
                        <hr className="flex-grow border-accent" />
                        <span className="mx-4 text-primary">or</span>
                        <hr className="flex-grow border-accent" />
                    </div>

                    {/* Social Login */}
                    <div className="flex justify-center gap-4 text-xl">
                        <FaFacebook className="cursor-pointer text-[#4267b2] hover:scale-110 transition" />
                        <FaTwitter className="cursor-pointer text-[#1da1f2] hover:scale-110 transition" />
                        <FaGithub className="cursor-pointer text-gray-800  hover:scale-110 transition" />
                        <FaGoogle className="cursor-pointer text-[#dd4b39] hover:scale-110 transition" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;