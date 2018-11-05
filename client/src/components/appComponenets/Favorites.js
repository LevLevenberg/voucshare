import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Row } from 'react-bootstrap';
import Voucher from '../voucher/Voucher';
import { getAllCategories } from '../../actions/category';
import { getAllVouchers, updateVoucher } from '../../actions/voucher'; 
class FavoriteVouchers extends React.Component{
    constructor(props){
        super(props);
        this.state={
            index:null
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
        this.props.getAllVouchers();
        }
    }
    updateIndex = (index) => {
        this.setState(()=>({index}));
    }
    render(){
        let favoriteListLength =[];
        if(this.props.vouchers.length > 0)
        {return (
        <div>
        <h3>Favorites</h3>
        <Row>
        {favoriteListLength = this.props.vouchers.map((voucher,index)=>(
            voucher.favorite_by.indexOf(this.props.auth.user._id)  !== -1
            &&
           <Voucher
            voucher={voucher}
            key={index}
            page="favorites"
            onVoucherRemoveFromFavorites={()=>{
                const updatedVoucher = voucher
                updatedVoucher.favorite_by.splice(index,1);
                this.props.updateVoucher(updatedVoucher._id, updatedVoucher, this.props.history);
            }}
            />            
            ))
        }
        {favoriteListLength[0] === false && <p>No Favorite Vouchers</p>}   
    </Row>
    </div>
);}
else
return (<p>No Vouchers to display</p>);
    }
    
}
const actions = { getAllCategories, getAllVouchers, updateVoucher}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        vouchers: state.vouchers
    }
}
export default connect(mapStateToProps, actions)(withRouter(FavoriteVouchers));