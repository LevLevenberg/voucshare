import React from 'react';
import {withRouter} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import {logoutUser} from '../../actions/authentication';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
class  Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAuth: false
        }
    }

    greetingMessage = () => {
        const now = new Date().getHours();
        if(now>=5 && now<=12){
            return 'Good Morning';
        }
        else if(now <= 18){
            return 'Good Afternoon';
        }
        else return 'Good Evening'
    }
    render(){
        return(
<Navbar inverse collapseOnSelect fixedTop>
    <Navbar.Header className='hidden-xs'>
        <Navbar.Brand  style={{cursor:'pointer'}}>
            <LinkContainer to='/' style={{cursor:'pointer'}}>
                <p ><strong>VOUCHSARE ;-) </strong></p>
            </LinkContainer>
        </Navbar.Brand>
        <Navbar.Text >
         {this.props.auth.isAuthenticated && `${this.props.greetingMessage} ${this.props.auth.user.username}`}
        </Navbar.Text>
    </Navbar.Header>
    <Navbar.Toggle />
    <Navbar.Collapse>
    {this.props.auth.isAuthenticated &&
        <Nav pullRight>
        <NavItem className='hidden-lg hidden-md hidden-sm'>
        <LinkContainer  to='/' style={{cursor:'pointer'}}>
                <p ><strong>VOUCHSARE ;-) </strong></p>
        </LinkContainer>
        </NavItem>
        <NavDropdown eventKey={6} title="Vouchers" id="basic-nav-dropdown">
            <NavItem eventKey={1}>
                <LinkContainer to='/publish'>
                    <p>Publish</p>
                </LinkContainer>
            </NavItem>
            <NavItem eventKey={2}>
                <LinkContainer to='/my_vouchers'>
                    <p>My vouchers</p>
                </LinkContainer>
            </NavItem>
            <NavItem eventKey={3}>
                <LinkContainer to='/favorites'>
                    <p>Favorites</p>
                </LinkContainer>
            </NavItem>
            <MenuItem divider />
        </NavDropdown>
        <NavDropdown eventKey={6} title="Offers" id="basic-nav-dropdown">
            <NavItem eventKey={4}>
                <LinkContainer to='/sent_offers'>
                    <p>Sent offers</p>
                </LinkContainer>
            </NavItem>
            <NavItem eventKey={5}>
                <LinkContainer to='/recieved_offers'>
                    <p>Recieved offers</p>
                </LinkContainer>
            </NavItem>
            <MenuItem divider />
        </NavDropdown>
        <NavDropdown eventKey={6} title="Account" id="basic-nav-dropdown">
            <NavItem eventKey={5}>
                <LinkContainer to='/edit_account'>
                    <p>Edit</p>
                </LinkContainer>
            </NavItem>
            <NavItem eventKey={5}>
                <LinkContainer to='/change_password'>
                    <p>Change Password</p>
                </LinkContainer>
            </NavItem>
            <NavItem eventKey={5}>
                <LinkContainer to='/delete_user'>
                    <p>Delete User</p>
                </LinkContainer>
            </NavItem>
            <MenuItem divider />
            <NavItem eventKey={5}>
                <p onClick={()=>{this.props.logoutUser(this.props.history)}}>logout</p>
            </NavItem>
        </NavDropdown>
        </Nav>
    }
    {!this.props.auth.isAuthenticated &&
    <Nav pullRight>
        <NavItem eventKey={1}>
            <LinkContainer to='/login'>
                <p>Login</p>
            </LinkContainer>
        </NavItem>
        <NavItem eventKey={2}>
            <LinkContainer to='/register'>
                <p>Signup</p>
            </LinkContainer>
        </NavItem>
    </Nav>
    }
    </Navbar.Collapse>
</Navbar>
        )
    }
}

const actions = {logoutUser};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
 }
 export default connect(mapStateToProps,actions)(withRouter(Header));