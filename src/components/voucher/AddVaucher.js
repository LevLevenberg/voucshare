import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Row } from 'react-bootstrap';
import VoucherForm from './VoucherForm';
import { getAllCategories } from '../../actions/category'; 
class AddVoucher extends React.Component{
    constructor(props){
        super(props);
        this.state={ 
            categories: undefined
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
        this.props.getAllCategories();
        }
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.categories.length>0){
            return {categories: nextProps.categories};
        }
        return null
    }
    render(){
        if (this.state.categories)
        return (
        <Row>
        <VoucherForm 
            page = "add"
            categories={this.state.categories}/>
        </Row>
);
else
    return "loading..." 
    }
    
}
const actions = { getAllCategories}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        categories: state.categories
    }
}
export default connect(mapStateToProps, actions)(withRouter(AddVoucher));