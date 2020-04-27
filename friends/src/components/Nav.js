import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText } from "reactstrap";

const NavComp = (props) => {

    // logout = () => {
    //     localStorage.removeItem("token");
    //     localStorage.clear();
        
    //     if (localStorage.getItem('token') === null) {
    //         this.props.history.push('/login');
    //     }
    // }

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">{`</AuthFriendsApp>`}</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/login">Login</NavLink>
                </NavItem>
            </Nav>
            <NavbarText>{localStorage.getItem('user')}</NavbarText>
        </Navbar>
    )
}

export default NavComp