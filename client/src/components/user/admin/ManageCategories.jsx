import React from 'react';
import UserNav from '../../../hoc/UserNav';
import ManageBrands from './ManageBrands';
import ManageWoods from './ManageWoods';

const ManageCategories = () => {
    return (
        <UserNav>
            <ManageBrands />
            <ManageWoods />
        </UserNav>
    )
}

export default ManageCategories
