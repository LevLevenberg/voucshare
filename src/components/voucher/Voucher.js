import React from 'react';
import { connect } from 'react-redux';
import { sendOffer } from '../../actions/offer';
import { updateVoucher } from '../../actions/voucher';
import { Col, Row } from 'react-bootstrap';
import {Link, withRouter } from 'react-router-dom';
import'../../style/voucher.css';

class Voucher extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isOfferBoxOpen:false,
            offer_value:this.props.voucher? this.props.voucher.price: ''
        }
    }

    onPlaceOfferClicked=()=>{
        this.setState((prevState)=>({
            isOfferBoxOpen:!prevState.isOfferBoxOpen,
           }
       ));
       }
       onChangeOffer=(e)=>{
           const offer_value = e.target.value;
           if(!offer_value || offer_value.match(/^\d{1,}(\.\d{0,2})?$/)){
               this.setState(()=>({offer_value}));
           }
       }
       onSendOffer=()=>{
           const offer = {
               offer_value: this.state.offer_value,
               sender: this.props.auth.user._id,
               reciever: this.props.voucher.user_id,
               voucher: this.props.voucher._id,
               isSent: true
           }
              this.props.sendOffer(offer, this.props.history);
       }
       onAddToFavorites = () => {
            const voucher = this.props.voucher
            voucher.favorite_by.push(this.props.auth.user._id);
            this.props.updateVoucher(this.props.voucher._id, voucher, this.props.history);
       }
       generateImgSrcString=()=>{
           const imgSrc = `${process.env.PUBLIC_URL}/img/${this.props.subcategory}.jpeg`;
           return imgSrc;
       }
       renderButtons=()=>{
        switch(this.props.page){
            case 'home':
                return(
                    (this.props.voucher.user_id !== this.props.auth.user._id) ?
                    (<Row>
                        <Col xs={6}><button onClick={this.onPlaceOfferClicked}>Place Offer</button></Col>
                        <Col xs={6}>
                            <button 
                            disabled={this.props.voucher.favorite_by.indexOf(this.props.auth.user._id)  !== -1} 
                            onClick={this.onAddToFavorites}>Add to favorites</button>
                        </Col>
                    </Row>)
                    :
                    (<Row>
                        <Col xs={12}><Link to ='/my_vouchers'>View on My vouchers</Link></Col>    
                    </Row>)
                );
            case 'favorites':
                return(
                    <Row>
                        <Col xs={6}>
                            <button onClick={this.onPlaceOfferClicked}>Place Offer</button>
                        </Col>
                        <Col xs={6}>
                            <button onClick={this.props.onVoucherRemoveFromFavorites}>Remove from favorites</button>
                        </Col>
                    </Row>
                );
            case 'my_vouchers':
                return(
                    <Row>
                        <Col xs={6}>
                            <button onClick={this.props.onVoucherRemove}>Remove</button>
                        </Col>
                    </Row>
                );
            default:
                return null;
        }
    }
    render(){
        if(this.props.voucher){
        const imgSrc = `${process.env.PUBLIC_URL}/img/${this.props.voucher.subcategory}.jpeg`;
         return(
            <Col xs={12} md={4} className='voucher-container' >
                <Row>
                <Col>
                    <Row>
                        <Col xs={4}>
                            <img src={imgSrc}
                                className= 'voucher-img'
                                alt={this.props.voucher.subcategory}/>
                        </Col>
                        <Col xs={8} >
                            <Row className='description-box'>
                                <Col xs={12} style={{overflowX:'hidden', maxHeight:20}}><strong >{this.props.voucher.title}</strong></Col>
                                <Col xs={12}>{this.props.voucher.category}</Col>                                
                                <Col xs={12}>{this.props.voucher.location}</Col>
                            </Row>
                            <Row className="price-box">
                                <Col xs={12}><strong>Value: </strong>{this.props.voucher.value}</Col>
                                <Col xs={12}><strong>Price: </strong>{this.props.voucher.price}</Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col >
                    <div className='button-box'>
                        {this.renderButtons()}
                    </div>
                    {this.state.isOfferBoxOpen && (
                        <Row className='offer-box'>
                            <Col xs={12}>Your Offer: <input type='text' value={this.state.offer_value} onChange={this.onChangeOffer}/></Col>
                            <Col xs={12}><button onClick={this.onSendOffer}>Send</button></Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </Col>
        );}
        else return (<p>loading...</p>)
    }
}
const actions = { sendOffer, updateVoucher }
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(withRouter(Voucher));