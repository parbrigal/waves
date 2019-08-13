import React from 'react';
import UserNav from '../../hoc/UserNav';
import PersonalNFO from './PersonalNFO';



const UpdateProfile = () => {
    return (
        <UserNav>
            <h1>Profile</h1>
            <PersonalNFO />
        </UserNav>
    )
}

export default UpdateProfile
