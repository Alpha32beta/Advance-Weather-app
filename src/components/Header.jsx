import Button from './Button';
import logo from '/src/assets/images/logo.svg';
import downicon from '/src/assets/images/icon-dropdown.svg';
import uniticon from '/src/assets/images/icon-units.svg';
import { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import { supabase } from '../supabaseClient';

const Header = ({ user, onShowAuth }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  function handleUnitClick() {
    setShowDropdown(!showDropdown);
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="flex justify-between items-center m-4">
      <div className="flex items-center gap-4">
        <img src={logo} alt="logo" />
        {user && (
          <div className="hidden md:block">
            <p className="dm-sans-regular text-sm text-gray-400">
              Signed in as <span className="text-white">{user.email}</span>
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <Button onClick={handleUnitClick}>
            <img className="w-4" src={uniticon} alt="unit icon" />
            <span className="hidden md:inline">Units</span>
            <img className="w-3" src={downicon} alt="down icon" />
          </Button>
          {showDropdown && <Dropdown onClose={() => setShowDropdown(false)} />}
        </div>
        {user ? (
          <Button onClick={handleSignOut}>
            <span className="dm-sans-regular">Sign Out</span>
          </Button>
        ) : (
          <Button onClick={onShowAuth}>
            <span className="dm-sans-regular">Sign In</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
