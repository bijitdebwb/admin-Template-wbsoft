// import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../../../assets/logo/logo.png";
import ForgotPasswordImg from "../../../assets/Auth/ForgotPassword.png";

const ForgotPassword = () => {

    const handleForgotPassword = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        console.log("Forgot Password Email:", { email });
        // Add API call here
    };
    return (
        <div className="flex items-center bg-base-100">
            {/* Left Illustration */}
            <div className="hidden lg:flex lg:flex-col items-center justify-center relative lg:w-8/12">
                <img
                    src={ForgotPasswordImg}
                    alt="Login image"
                    className="max-w-sm xl:max-w-md h-auto object-cover"
                />
            </div>

            {/* Right Login Card */}
            <div className="h-screen bg-base-200 flex items-center justify-center p-10 w-full lg:w-4/12">
                <div className="w-full max-w-md space-y-6">
                    {/* Logo */}
                    <Link to="/">
                        <img
                            className="w-32 h-12 mx-auto mb-16"
                            src={Logo}
                            alt="Logo"
                        />
                    </Link>

                    {/* Title */}
                    <div>
                        <h2 className="auth_headertext">
                            Forgot Password?
                        </h2>
                        <p className="text-primary-content">
                            Enter your email and we'll send you instructions to reset your password
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleForgotPassword} className="space-y-5">

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

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full py-2 btn transition"
                        >
                            Send Reset Link
                        </button>
                    </form>

                    {/* Create Account */}
                    <p className="text-center text-sm">

                        <Link to="/login" className="linkClass flex items-center justify-center">
                            <IoIosArrowBack /> Back to Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;