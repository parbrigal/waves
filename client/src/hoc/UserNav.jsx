import React from 'react';
import { Link } from 'react-router-dom';


const links = [
    {
        name:'My account',
        linkTo:'/user/dashboard'
    },
    {
        name:'User info',
        linkTo:'/user/profile'
    },
    {
        name:'My cart',
        linkTo:'/user/my_cart'
    },

]

const UserNav = (props) => {

    const generateLinks = (links) => (
        links.map((item,i) => (
            <Link to={item.linkTo} key={i}>{item.name}</Link>
        ))
    )
  return (
    <div className="container">
        <div className="user_container">
            <div className="user_left_nav">
                <h2>My account</h2>
                <div className="links">
                    { generateLinks(links) }
                </div>
            </div>
            <div className="user_right">
                {props.children}
            </div>
        
        </div>
    </div>
  )
}

export default UserNav
