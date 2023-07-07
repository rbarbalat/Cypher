import React, { forwardRef } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
const NavigationMenu = forwardRef((props, ref) => {
    const { logout, viewUser } = props;
    return (
        <div ref={ref} className='navigation_menu--wrapper'>
            <span onClick={viewUser} className='navigation_menu--option'>
                <span>View Profile</span>
            </span>
            <span onClick={logout} className='navigation_menu--option'>
                <span>Log Out</span>
                <FaSignOutAlt/>
            </span>
        </div>
    )
})

export default NavigationMenu
