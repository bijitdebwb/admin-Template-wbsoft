import { useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import Logo from "../../../assets/logo/logo.png";
import login from "../../../assets/Auth/login.png"
// import loginDark from "../../../assets/Auth/login_dark.png"
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Handle login logic here
        const email = e.target.email.value;
        const password = e.target.password.value;
        const info = { email, password };

        try {
            // Step 1: Login
            const res = await axiosPublic.post("/api/login", info);

            if (res?.data) {
                toast.success(res?.data?.message);

                const token = res?.data?.access_token || res?.data?.token;
                const userData = res?.data?.userData

                // Save token
                localStorage.setItem("token", token);
                localStorage.setItem("userData", JSON.stringify(userData));
                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            console.error("Login error:", err.response);
            toast.error(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            // setLoading(false);
        }

    }


    return (
        <div className="flex items-center bg-base-100">
            {/* Left Illustration */}
            <div className="hidden lg:flex lg:flex-col items-center justify-center  relative lg:w-8/12">
                <img
                    // src={theme === "light" ? login : loginDark}
                    src={login}
                    alt="Login illustration"
                    className="max-w-lg 2xl:max-w-xl h-auto object-cover"
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
                            Welcome to <span className="capitalize">Itder</span>! 👋
                        </h2>
                        <p className="text-primary-content">
                            Please sign in to your account and start the adventure
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="labelClass"
                            >
                                Email
                            </label>
                            <input
                                autoFocus
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                name="email"
                                required
                                className="inputClass"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="labelClass"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="********"
                                    name="password"
                                    required
                                    className="inputClass"
                                />
                                {/* Toggle Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="passwordIcon"
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2">
                                <input className="checkbox bg-base-200" type="checkbox" />
                                <span className="h-full text-primary-content">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="linkClass">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full py-2 btn transition"
                        >
                            Login
                        </button>
                    </form>

                    {/* Create Account */}
                    <p className="text-center text-sm">
                        New on our platform?{" "}
                        <Link to="/register" className="linkClass">
                            Create an account
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
                        <FaGithub className="cursor-pointer text-gray-800 hover:scale-110 transition" />
                        <FaGoogle className="cursor-pointer text-[#dd4b39] hover:scale-110 transition" />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;