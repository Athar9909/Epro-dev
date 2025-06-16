import { Calendar, Clock, FileText, Home, User } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AppNavbar = () => {
    const location = useLocation();
    const [active, setActive] = useState("home");

    // Memoized path segment extraction
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

    // Nav items configuration
    const navItems = [
        { id: 'home', path: 'Homepage', icon: Home, label: 'Home' },
        { id: 'meeting', path: 'Meeting', icon: Calendar, label: 'Meeting' },
        { id: 'document', path: 'Documents', icon: FileText, label: 'Documents' },
        { id: 'timeline', path: 'Timeline', icon: Clock, label: 'Timeline' },
        { id: 'profile', path: 'Profile', icon: User, label: 'Profile' }
    ];

    return (
        // <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
            <div className="flex items-center justify-around">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        to={`/User-App/${item.path}`}
                        onClick={() => setActive(item.id)}
                        className={`flex flex-col items-center gap-1 ${active === item.id ? "text-[#009eb4]" : 'text-gray-400'}`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AppNavbar;