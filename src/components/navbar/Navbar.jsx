import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './Navbar.scss';
import newRequest from '../../utils/newRequest';
const Navbar = () => {

    const[active, setActive] = useState(false);
    const[open, setOpen] = useState(false);

    const {pathname} = useLocation();
    const navigate = useNavigate();

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    }

    useEffect(()=>{
        window.addEventListener('scroll', isActive);

        return () => {
            window.removeEventListener('scroll', isActive);
        }
    }, [])

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const handleLogout = async()=>{
        try{
            await newRequest.post('/auth/logout');
            localStorage.setItem("currentUser", null);
            navigate('/')
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className={active || pathname !== '/' ? "navbar active" : "navbar"}>
            <div className="container">
                <div className="logo">
                    <Link className='link' to='/'><span className="text">fiverr</span></Link>
                    <span className="dot">.</span>
                </div>
                <div className="links">
                    <span>Fiverr Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    {!currentUser?.isSeller && <span>Become a Seller</span>}
                    {currentUser ? (
                        <div className="user" onClick={()=>setOpen(!open)}>
                            <img 
                                src={currentUser.img || "/img/noavatar.jpg"} 
                                alt="" 
                            />
                            <span>{currentUser?.username}</span>
                            {open && (
                                <div className="options">
                                    {currentUser?.isSeller && (
                                        <>
                                            <Link to='/mygigs' className='link'>Gigs</Link>
                                            <Link to='/add' className='link'>Add New Gig</Link>
                                        </>
                                    )}
                                <Link to='/orders' className='link'>Orders</Link>
                                <Link to='/messages' className='link'>Messages</Link>
                                <Link className='link' onClick={handleLogout}>Logout</Link>
                            </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to='/login' className='link'>Sign in</Link>
                            <Link to='/register' className='link'>
                                <button>Join</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {(active || pathname !== '/') && (
                <>
                    <hr />
                    <div className="menu">
                        <Link to='/' className='link menuLink'>
                            Graphics & Design
                        </Link>
                        <Link to='/' className='link'>
                            Video & Animation
                        </Link>
                        <Link to='/' className='link'>
                            Writing & Translation
                        </Link>
                        <Link to='/' className='link'>
                            AI Services
                        </Link>
                        <Link to='/' className='link'>
                            Digital Marketing
                        </Link>
                        <Link to='/' className='link'>
                            Music & Audio
                        </Link>
                        <Link to='/' className='link'>
                            Programming & Tech
                        </Link>
                        <Link to='/' className='link'>
                            Business
                        </Link>
                        <Link to='/' className='link'>
                            Lifestyle
                        </Link>
                    </div>
                    <hr />
                </>
            )}
        </div>
  );
}

export default Navbar