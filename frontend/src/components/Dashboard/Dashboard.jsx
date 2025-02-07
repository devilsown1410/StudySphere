import React,{useState} from 'react';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import Profile from '../profile/Profile';

function Dashboard() {
    const { currentUser } = useAuth()
    const navigate=useNavigate();
    const [activeComponent, setActiveComponent] = useState('Profile');

    const renderComponent = () => {
        switch (activeComponent) {
        case 'Profile':
            return <Profile/>;
        case 'Resources':
            // return <Resources />;
        case 'ChatRoom':
            // return <ChatRoom />;
        case 'VideoLectures':
            // return <VideoLectures />;
        case 'Settings':
            // return <Settings />;
        default:
            // return <Profile />;
        }
    };

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
            <div className="flex flex-1 pt-[4rem]">
                {/* <Sidebar /> */}
                <div className="fixed top-16 left-0 h-full w-55 z-10 mt-1">
                <SideBar/>
                </div>
                <main className='flex-1 ml-60 overflow-y-auto'>
                <div className="flex justify-center align-center p-6 rounded-lg">
                    {renderComponent()}
                </div>
                {/* <div>
                    <h1>Dashboard</h1>
                    <p>Welcome, {currentUser.email}</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div> */}
                </main>
            </div>
        </div>
    )
}

export default Dashboard
