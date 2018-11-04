import React from 'react';
import { connect } from 'react-redux';
import { sendOffer, updateOffer, deleteOffer } from '../../actions/offer';
import { Col, Row} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../../style/offer.css';

class Offer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:'',
            phoneChecked:false,
            emailChecked:false,
            isAvailable: true,
            isResponded:false,
            error:''
        }
    }
    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
        }
    }
    
    onChangeOffer=(e)=>{
           const offer_value = e.target.value;
           if(!offer_value || offer_value.match(/^\d{1,}(\.\d{0,2})?$/)){
               this.setState(()=>({offer_value}));
           }
       }
    onAcceptClicked = () => {
        this.setState({
            show:'contact_options'
        })
    }
    onPhoneBoxClicked = () => {
        this.setState((prevState)=>({
            phoneChecked:!prevState.phoneChecked,
            error:''
        }))
    }
    onEmailBoxClicked = () => {
        this.setState((prevState)=>({
            emailChecked:!prevState.emailChecked,
            error:''
        }))
    }
    onIsAvailable = () => {
        this.setState({
            isAvailable:true
        })
    }
    onIsNotAvailable = () => {
        this.setState({
            isAvailable:false
        })
    }
    onSendContacts = (e) => {
        e.preventDefault();
        if(this.state.phoneChecked === false && this.state.emailChecked === false){
            this.setState({
                error:'Must select at least one contact option'
            });
            return;
        }
        const offer = this.props.offer;
        offer.phone = this.state.phoneChecked? this.props.auth.user.phone:'';
        offer.email = this.state.emailChecked? this.props.auth.user.email:'';
        offer.isResponded = true;
        offer.isAccepted = true;
        this.props.updateOffer(offer, this.props.history);
        this.setState({
            show:''
        })
    }
    onOfferDenied = () => {
        const offer = this.props.offer;
        offer.isResponded = true;
        offer.isAccepted = false;
        this.props.updateOffer(offer, this.props.history);
        this.setState({
            show:''
        })
    }
    render(){
         return(
            this.props.offer.voucher &&
            <Col xs={12} md={4} lg={3} className='offer-container'>
                    <Row>
                        <Col xs={12} style={{textAlign:'center'}}>
                            {this.state.show === '' && this.props.page === 'sent_offers' && <Row style={{backgroundColor:'lightgrey'}}><strong>Sent to: </strong> {this.props.offer.reciever.username}</Row>}
                            {this.state.show === '' && this.props.page === 'recieved_offers' && <Row style={{backgroundColor:'lightgrey'}}><strong>Sender: </strong> {this.props.offer.sender.username}</Row>}
                            {this.state.show === '' && 
                            <Row style={{padding:10}}>
                                <Col>Title: {this.props.offer.voucher.title} </Col>
                                <Col style={{backgroundColor:'lightgrey'}}>Value: {this.props.offer.voucher.value} </Col>
                                <Col>Wanted price: {this.props.offer.voucher.price} </Col>
                                {this.props.page === 'recieved_offers' && <Col style={{backgroundColor:'lightgrey'}}>Recieved offer: {this.props.offer.offer_value} </Col>}
                                {this.props.page === 'sent_offers' &&  <Col style={{backgroundColor:'lightgrey'}}>My offer: {this.props.offer.offer_value} </Col>}
                                
                                {this.props.page === 'sent_offers' 
                                    &&
                                    this.props.offer.isResponded
                                    && 
                                    <Col>Answer: {this.props.offer.isAccepted?
                                        (<div>
                                            <p className="success"> Your offer is accepted</p>
                                            <p className="success"> Contact details: {this.props.offer.phone || this.props.offer.email}</p>
                                        </div>)
                                        :
                                        (<p className="error"> Your offer is denied</p>)} 
                                    </Col>
                                }  
                            </Row>
                            }

                            {this.state.show === 'contact_options' && 
                            <Row>
                                <form onSubmit={this.onSendContacts}>
                                    {!this.state.error && <p>How would you like the buyer to contact you?</p>}
                                    {!!this.state.error && <p className='error'>{this.state.error}</p>}
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            checked ={this.state.phoneChecked}
                                            onChange ={this.onPhoneBoxClicked} 
                                            />
                                        <label>Phone</label>
                                    </div>
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            checked ={this.state.emailChecked}
                                            onChange ={this.onEmailBoxClicked} 
                                            />
                                        <label>Email</label>
                                    </div>
                                    <button type="submit">Send</button>
                                </form>
                            </Row>
                            }

                            {this.props.page === 'sent_offers' && 
                            <Row>
                                <button onClick = { () => this.props.deleteOffer(this.props.offer._id)}>Remove</button>
                            </Row>
                            }    
                            {this.state.show === '' 
                                && this.props.page === 'recieved_offers' 
                                && !this.props.offer.isResponded
                                &&
                            <Row>
                                <button onClick={this.onAcceptClicked}>Accept</button>
                                <button onClick={this.onOfferDenied}>Deny</button>
                            </Row>
                            }
                            {this.state.show === '' 
                                && this.props.page === 'recieved_offers' 
                                && this.props.offer.isResponded
                                &&
                            <Row>
                                {this.props.offer.isAccepted?(
                                    <p className='success'>Offer accepted</p>
                                ):(
                                    <p className='error'>Offer denied</p>
                                )}
                            </Row>
                            }                
                        </Col>
                    </Row>
            </Col>
        );
    }
}
const actions = { sendOffer, updateOffer, deleteOffer }
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(withRouter(Offer));