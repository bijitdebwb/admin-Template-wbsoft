import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';

const Layout = () => {

    
    return (
        <div className=''>
            <Navbar />
            <div className='w-full '>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;