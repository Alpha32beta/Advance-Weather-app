// src/components/Header.jsx
import Button from './Button';
import logo from '/src/assets/images/logo.svg';
import downicon from '/src/assets/images/icon-dropdown.svg';
import uniticon from '/src/assets/images/icon-units.svg';
import { useState } from 'react';
import Dropdown from './Dropdown';
import { supabase } from '../supabaseClient';

const Header = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  function handleUnitClick() {
    setShowDropdown(!showDropdown);
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

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
        <div className="relative">
          <Button onClick={handleUnitClick}>
            <img className="w-full" src={uniticon} alt="unit icon" />
            Units
            <img src={downicon} alt="down icon" />
          </Button>
          {showDropdown && <Dropdown />}
        </div>
        <Button onClick={handleSignOut}>
          <span className="dm-sans-regular">Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;