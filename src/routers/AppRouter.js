import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect} from 'react-redux';

/*COMPONENTS*/
import Header from '../components/appComponenets/Header';
import Login from '../components/user/Login';
import Register from '../components/user/Register';
import Home from '../components/appComponenets/Home';
import Favorites from '../components/appComponenets/Favorites';
import OffersSent from '../components/offer/OffersSent';
import OffersRecieved from '../components/offer/OffersRecieved';
import EditUser from '../components/user/EditUser';
import UserVoucherList from '../components/voucher/UserVoucherList';
import ChangePassword from '../components/user/ChangePassword';
import DeleteUser from '../components/user/DeleteUser';
import AddVoucher from '../components/voucher/AddVaucher';
import NotFoundPage from '../components/appComponenets/NotFoundPage';

const greetingMessage = () => {
    const now = new Date().getHours();
    console.log(now);
    if(now>=5 && now<=11){
        return 'Good Morning';
    }
    else if(now <= 18){
        return 'Good Afternoon';
    }
    else return 'Good Evening'
}


const AppRouter = (props) =>(
            <Router>
                <div>
                    <Header greetingMessage = {greetingMessage()}/>
                    <div style={{padding: 80}}>
                    <Switch>
                        <Route path="/" component = {props.auth.isAuthenticated?Home:Login} exact={true}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/publish" component={AddVoucher}/>
                        <Route path="/my_vouchers" component={UserVoucherList}/>
                        <Route path="/favorites" component={Favorites}/>
                        <Route path="/recieved_offers" component={OffersRecieved}/>
                        <Route path="/sent_offers" component={OffersSent}/>                   
                        <Route path="/edit_account" component={EditUser}/>
                        <Route path="/change_password" component={ChangePassword}/>
                        <Route path="/delete_user" component={DeleteUser}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                    </div>
                </div>                
            </Router>
        );
const mapStateToProps = (state) => {
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(AppRouter);