import Button from './Button'
import logo from '/src/assets/images/logo.svg'
import downicon from '/src/assets/images/icon-dropdown.svg'
import uniticon from '/src/assets/images/icon-units.svg'
import { useState } from 'react'
import Dropdown from './Dropdown'


const Header = () => {
    const [showDropddown, setShowDropdown] = useState(false)
    function handleUnitClick() {
        setShowDropdown(!showDropddown);
    }
    return (
        <div className="flex justify-between items-center m-4">
            <img src={logo} alt="logo" />
           <div className='relative'>
             <Button onClick={handleUnitClick}>
                <img className='w-full' src={uniticon} alt='unit icon' />
                Units
                <img src={downicon} alt='down icon' />
            </Button>
            {
                showDropddown && <Dropdown />
            }
           </div>
        </div>
    )
}

export default Header