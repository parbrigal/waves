import React from "react";
import UserNav from "../../hoc/UserNav";
import OurButton from "../../components/elements/OurButton";

const Dashboard = () => {
  return (
    <UserNav>
      <div>
        <div className="user_nfo_panel">
          <h1>User Information</h1>
          <div>
            <span>name</span>
            <span>lastname</span>
            <span>email</span>
          </div>
          <OurButton type="default" title="Edit Info" linkTo="/user/profile" />
        </div>
        <div className="user_nfo_panel">
          <h1>My Orders</h1>
            <div className="user_product_block_wrapper">
                history
            </div>
        </div>
      </div>
    </UserNav>
  );
};

export default Dashboard;
