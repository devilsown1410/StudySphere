import React from 'react';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';

function Dashboard() {
    const { currentUser } = useAuth()
    const navigate=useNavigate();

    const handleSignOut = async () => {
        try {
            await doSignOut()
            navigate('/');
        } catch (error) {
            console.error("Error signing out: ", error)
        }
    }

    return (
        <div 
            className="flex flex-col min-w-screen min-h-screen"
            style={{
                backgroundColor:"rgb(19, 22, 31)",
            }}
        >
            {/* <Navbar /> */}
            <div className="fixed top-0 w-full z-10">
                <Header />
            </div>
            <div className="flex flex-1 pt-16">
                {/* <Sidebar /> */}
                <div className="fixed top-16 left-0 h-full w-55 z-10 mt-1">
                <SideBar/>
                </div>
                <div className='mt-[4rem] flex-1 ml-60 pt-6 pl-10 pr-6 overflow-y-auto'>
                    <h1>Dashboard</h1>
                    <p>Welcome, {currentUser.email}</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
