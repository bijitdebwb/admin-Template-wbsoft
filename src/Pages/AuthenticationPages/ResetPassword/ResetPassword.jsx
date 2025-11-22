import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../../../assets/logo/logo.png";
import ResetPasswordImg from "../../../assets/Auth/ResetPassword.png";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [newShowPassword, setNewShowPassword] = useState(false);

    const handleResetPassword = (e) => {
        e.preventDefault();
        const password = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("Reset Password to:", { password });
        // Add API call here
    };

    return (
        <div className="flex items-center bg-base-100">
            {/* Left Illustration */}
            <div className="hidden lg:flex lg:flex-col items-center justify-center relative lg:w-8/12">
                <img
                    src={ResetPasswordImg}
                    alt="Reset Password Illustration"
                    className="max-w-sm xl:max-w-md h-auto object-cover"
                />
            </div>

            {/* Right Card */}
            <div className="h-screen flex items-center justify-center bg-base-200 p-10 w-full lg:w-4/12">
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
                            Reset Password 🔒
                        </h2>
                        <p className="text-primary-content">
                            Your new password must be different from previously used passwords
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleResetPassword} className="space-y-5">

                        {/* New Password */}
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="labelClass "
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={newShowPassword ? "text" : "password"}
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="•••••••••••"
                                    required
                                    className="inputClass"
                                />
                                <button
                                    type="button"
                                    onClick={() => setNewShowPassword(!newShowPassword)}
                                    className="passwordIcon"
                                >
                                    {newShowPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="labelClass  "
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="•••••••••••"
                                    required
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

                        {/* Reset Button */}
                        <button type="submit" className="w-full py-2 btn transition">
                            Set New Password
                        </button>
                    </form>

                    {/* Back to Login */}
                    <p className="text-center text-sm">
                        <Link
                            to="/login"
                            className="linkClass flex items-center justify-center gap-1"
                        >
                            <IoIosArrowBack /> Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;