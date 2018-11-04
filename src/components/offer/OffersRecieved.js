import React from 'react';
import Offer from './Offer';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRecievedOffers } from '../../actions/offer';

class OffersRecieved extends React.Component {
    constructor(props){
        super(props);
        this.state={
            offers:undefined
        }
        
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.getRecievedOffers();
        }
        else{
            this.props.history.push('/login');
        }
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.offers !== prevState.offers){
            return {offers: nextProps.offers};
        }
        return null
    }
    render(){
        if(this.state.offers && this.state.offers.length > 0 )
        return(
        <div>
        <h3>Recieved offers</h3>
            <Row>
                {this.state.offers.map((offer,index)=>(
                <Offer
                offer={offer}
                key={index}
                page="recieved_offers"
                onAcceptClicked={this.onAcceptClicked}
                onModalClose={this.onModalClose}
                />
                ))
                }   
            </Row>
        </div>
        );
        else
        return(
            <p>No Offers recieved</p>
        );
    }
}




const actions = { getRecievedOffers }
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        offers: state.recievedOffers
    }
}
export default connect(mapStateToProps, actions )(withRouter(OffersRecieved));