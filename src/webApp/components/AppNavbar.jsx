import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AppNavbar = () => {
    const location = useLocation();
    const [active, setActive] = useState("home");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [navVisible, setNavVisible] = useState(true);
    const [scrollingDown, setScrollingDown] = useState(false);

    // Scroll handling logic (same as before)
    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY) {
                    if (!scrollingDown) {
                        setNavVisible(false);
                        setScrollingDown(true);
                    }
                } else {
                    if (scrollingDown) {
                        setNavVisible(true);
                        setScrollingDown(false);
                    }
                }
            } else {
                if (!navVisible) {
                    setNavVisible(true);
                    setScrollingDown(false);
                }
            }

            setLastScrollY(currentScrollY);
        };

        let throttleTimeout;
        const throttledScroll = () => {
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(() => {
                    controlNavbar();
                    throttleTimeout = null;
                }, 100);
            }
        };

        window.addEventListener('scroll', throttledScroll);
        return () => {
            window.removeEventListener('scroll', throttledScroll);
            if (throttleTimeout) {
                clearTimeout(throttleTimeout);
            }
        };
    }, [lastScrollY, navVisible, scrollingDown]);

    // Get current route segment
    const currentSegment = useMemo(() => {
        const segments = location.pathname.split('/').filter(Boolean);
        const userAppIndex = segments.indexOf('User-App');
        return userAppIndex !== -1 && segments.length > userAppIndex + 1
            ? segments[userAppIndex + 1]
            : null;
    }, [location.pathname]);

    // Set active tab based on current segment
    useEffect(() => {
        if (currentSegment) {
            const activeMap = {
                'Homepage': 'home',
                'Meeting': 'meeting',
                'Documents': 'document',
                'Timeline': 'timeline',
                'Profile': 'profile'
            };
            setActive(activeMap[currentSegment] || 'home');
        }
    }, [currentSegment]);

    // Nav items configuration with active and inactive icons
    const navItems = [
        { 
            id: 'home', 
            path: 'Homepage', 
            icon: '/resourcesApp/iconsApp/home.svg', 
            activeIcon: '/resourcesApp/iconsApp/homeActive.svg',
            label: 'Home' 
        },
        { 
            id: 'meeting', 
            path: 'Meeting', 
            icon: '/resourcesApp/iconsApp/meeting.svg', 
            activeIcon: '/resourcesApp/iconsApp/meetingActive.svg',
            label: 'Meeting' 
        },
        { 
            id: 'document', 
            path: 'Documents', 
            icon: '/resourcesApp/iconsApp/rfq.svg', 
            activeIcon: '/resourcesApp/iconsApp/rfqActive.svg',
            label: 'Documents' 
        },
        { 
            id: 'timeline', 
            path: 'Timeline', 
            icon: '/resourcesApp/iconsApp/timeline.svg', 
            activeIcon: '/resourcesApp/iconsApp/timelineActive.svg',
            label: 'Timeline' 
        },
        { 
            id: 'profile', 
            path: 'Profile', 
            icon: '/resourcesApp/iconsApp/profile.svg', 
            activeIcon: '/resourcesApp/iconsApp/profileActive.svg',
            label: 'Profile' 
        }
    ];

    return (
        <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 transition-transform duration-300 ease-in-out ${
            navVisible ? 'translate-y-0' : 'translate-y-full'
        }`}>
            <div className="flex items-center justify-around">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        to={`/User-App/${item.path}`}
                        onClick={() => setActive(item.id)}
                        className="flex flex-col items-center gap-1"
                    >
                        {/* Show active icon if current route matches */}
                        <img 
                            src={active === item.id ? item.activeIcon : item.icon} 
                            alt={item.label} 
                            className="w-6 h-6"
                        />
                        <span className={`text-xs font-medium ${
                            active === item.id ? "text-[#009eb4]" : 'text-gray-400'
                        }`}>
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AppNavbar;