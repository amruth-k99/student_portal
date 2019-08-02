  
import React, { Component} from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavLink,
   } from 'reactstrap';


  
class AppNavbar extends Component{
    state ={
      isOpen : false

    }
    toggle = ()=>{
      this.setState({isOpen:!this.state.isOpen
      } );
    };

  
    render(){
return (
  <div>






<Navbar color="light" light expand="md">
          <NavbarBrand href="/">Student Portal</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Academics">Academics</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Library/">Library</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/MessAllotment/">Mess Allotment</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Profile/">Profile</NavLink>
              </NavItem>

              <Button outline color="danger">Logout</Button>
    
              
              </Nav>
          </Collapse>
        </Navbar>
    







  
  
  </div>



);


    }
  
  }

export default AppNavbar;
    