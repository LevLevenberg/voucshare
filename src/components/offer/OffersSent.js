import React from 'react';
import Offer from './Offer';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSentOffers } from '../../actions/offer';

class OffersSent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user_id:''
        }
        
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.getSentOffers();
            this.setState({
                user_id:this.props.auth.user._id
            })
        }
        else{
            this.props.history.push('/login');
        }
    }
    

    render(){
        if(this.props.offers && this.props.offers.length > 0 )
        {return(
        <div>
        <h3>Sent offers</h3>
            <Row>
                {this.props.offers.map((offer,index)=>(
                    <Offer
                    offer={offer}
                    key={index}
                    page="sent_offers"
                    />
                    ))
                }   
            </Row>
        </div>
        );}
        else
        return(
            <p>No Offers sent</p>
        );
    }
}




const actions = { getSentOffers }
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        offers: state.sentOffers
    }
}
export default connect(mapStateToProps, actions )(withRouter(OffersSent));