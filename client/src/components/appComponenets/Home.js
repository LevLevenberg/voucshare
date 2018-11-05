import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { getAllVouchers } from '../../actions/voucher';
import { getAllCategories} from '../../actions/category';
import { getLocations } from '../../actions/location';
import { Row, Col } from 'react-bootstrap';
import Voucher from '../voucher/Voucher';
import VoucherFilter from '../voucher/VoucherFilter';
import selector from '../../selectors/voucher';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            vouchers: undefined,
        }
    }
    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login')
        }
        this.props.getAllVouchers();
        this.props.getAllCategories();
        this.props.getLocations();
        
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.vouchers !== prevState.vouchers){
            return {vouchers: nextProps.vouchers}
        }
        return null;
    }
    render(){
        if(this.props.locations.length > 0 
            && this.state.vouchers 
            && this.state.vouchers.length > 0
             ){
        return(
            <div>
                <Row>
                    <Col xs={12}>
                        <h3>Home</h3>
                    </Col>
                    <Col xs={12} sm={3} style={{marginTop:10}}>
                        <VoucherFilter/>
                    </Col>
                    <Col xs={12} sm={9} className='homepage'>
                        {<Row>
                            {
                            this.state.vouchers.map((voucher,index)=>(
                                <Voucher
                                key={index}
                                voucher={voucher}
                                page="home"
                                />
                                ))
                            }   
                        </Row>}
                    </Col>
                </Row>
            </div>
        );}
        else
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <h3>Home</h3>
                    </Col>
                    <Col xs={12} sm={3} style={{marginTop:10}}>
                        <VoucherFilter/>
                    </Col>
                    <Col xs={12} sm={9} className='homepage'>
                        <p>No vouchers to display</p>
                    </Col>
                </Row>
            </div>
            );
    }
}
const actions = { getAllVouchers, getAllCategories, getLocations }
const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        vouchers: selector(state.vouchers, {...state.filters}),
        categories: state.categories,
        locations: state.locations
    }
}

export default connect(mapStateToProps, actions )(withRouter(Home));