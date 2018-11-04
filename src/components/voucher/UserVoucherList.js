import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Row } from 'react-bootstrap';
import Voucher from './Voucher';
import { getAllVouchers, deleteVoucher } from '../../actions/voucher'; 
class Vouchers extends React.Component{
    constructor(props){
        super(props);
        this.state={ }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
        this.props.getAllVouchers();
        }
    }

    render(){
        if (this.props.vouchers && this.props.vouchers.length>0)
        return (
        <div>
            <h3>My published vouchers</h3>
            <Row>
                {this.props.vouchers.map((voucher,index)=>(
                    this.props.auth.user._id === voucher.user_id
                    &&
                    <Voucher
                    voucher={voucher}
                    key={index}
                    page="my_vouchers"
                    onVoucherRemove={()=>{
                        this.props.deleteVoucher(voucher._id,this.props.history)
                    }}
                    />
                    ))
                }   
            </Row>
        </div>
        );
        else
            return (<p>No vouchers available</p>) 
    }
    
}
const actions = { getAllVouchers, deleteVoucher}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        vouchers: state.vouchers
    }
}
export default connect(mapStateToProps, actions)(withRouter(Vouchers));