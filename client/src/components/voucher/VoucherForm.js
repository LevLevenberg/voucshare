import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {publishVoucher} from '../../actions/voucher';
import { FormGroup, FormControl, ControlLabel, HelpBlock} from'react-bootstrap';
import '../../style/buttnos.css';
class VoucherForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            category: '',
            subcategory: '',
            title: '',
            value: '',
            price:'',
            location:'',
            offerBoxOpened: false,
            categories:[],
            errors:{}
        }
    }
    componentDidMount(){
        if(!this.props.auth.isAuthenticated)
        this.props.history.push('/login');

        if(this.props.page && this.props.page === "edit"){
        const {category,subcategory,title,value,price,location} = this.props.voucherToEdit;
        this.setState(() => ({
            category,
            subcategory,
            title,
            value,
            price,
            location
        }));
        }
        this.setState({
            categories:this.props.categories,
            location: this.props.auth.user.location
        })

    }

    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.errors){
            return {errors: nextProps.errors};
        }
        return null
    }

    onInputChange = (e) => {
        if(e.target.name === "value" || e.target.name === "price"){
            const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState({
                [e.target.name]: e.target.value
            });
        }}
        else{
        this.setState({
            [e.target.name]: e.target.value
        });
        }
    }

    onSubmitForm = (e)=>{
        e.preventDefault();
        const voucher = {
            user_id:this.props.auth.user._id,
            category: this.state.category? this.state.categories[this.state.category].categoryName: '',
            subcategory:(this.state.subcategory && this.state.category)? this.state.subcategory: '',
            title:this.state.title,
            value:this.state.value,
            price:this.state.price,
            location:this.state.location
        }
        this.props.publishVoucher(voucher,this.props.history);
    }
    render(){
        const errors = this.state.errors;
        return(
            <div className='form'>
                <form onSubmit={this.onSubmitForm}>
                    <FormGroup
                        controlId="category"
                        validationState={errors.category? 'error': null}
                        >
                        <ControlLabel>Category</ControlLabel>
                        <FormControl
                        componentClass="select"
                        name="category"
                        placeholder="Select Category"
                        value={this.state.category}
                        onChange={this.onInputChange}
                        >
                        <option name='category' value=''>Select category</option>

                        {this.state.categories.map((category,index)=>(
                            <option key={index} value={index}>{category.categoryName}</option>
                        ))}
                        </FormControl>
                        <FormControl.Feedback/>
                        <HelpBlock>{this.state.errors.category?this.state.errors.category:null}</HelpBlock>
                    </FormGroup>
                    <FormGroup
                        controlId="subcategory"
                        validationState={this.state.errors.subcategory? 'error': null}
                        >
                        <ControlLabel>Subcategory</ControlLabel>
                        <FormControl
                        componentClass="select"
                        name="subcategory"
                        placeholder="Select Subategory"
                        value={this.state.subcategory}
                        onChange={this.onInputChange}
                        >
                        <option name='subcategory' value=''>Select subcategory</option>

                        {this.state.category !== ""
                            &&
                            this.state.categories[this.state.category]
                            .subcategories
                            .map((subcategory,index)=>(
                            <option key={index} value={subcategory.name}>{subcategory.name}</option>
                        ))}
                        </FormControl>
                        <FormControl.Feedback/>
                        <HelpBlock>{this.state.errors.subcategory?this.state.errors.subcategory:null}</HelpBlock>
                    </FormGroup>
                    
                    <FormGroup
                        controlId="title"
                        validationState={this.state.errors.title? 'error': null}
                        >
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                        name="title"
                        placeholder="Insert Title"
                        value={this.state.title}
                        onChange={this.onInputChange}
                        >
                        </FormControl>
                        <FormControl.Feedback/>
                        <HelpBlock>{this.state.errors.title?this.state.errors.title:null}</HelpBlock>
                    </FormGroup>
                   
                    <FormGroup
                        controlId="value"
                        validationState={this.state.errors.value? 'error': null}
                        >
                        <ControlLabel>Value</ControlLabel>
                        <FormControl
                        name="value"
                        placeholder="Example: 100.00 / 100.0 / 100"
                        value={this.state.value}
                        onChange={this.onInputChange}
                        >
                        </FormControl>
                        <FormControl.Feedback/>
                        <HelpBlock>{this.state.errors.value?this.state.errors.value:null}</HelpBlock>
                    </FormGroup>

                    <FormGroup
                        controlId="price"
                        validationState={this.state.errors.price? 'error': null}
                        >
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                        name="price"
                        placeholder="Example: 100.00 / 100.0 / 100"
                        value={this.state.price}
                        onChange={this.onInputChange}
                        >
                        </FormControl>
                        <FormControl.Feedback/>
                        <HelpBlock>{this.state.errors.price?this.state.errors.price:null}</HelpBlock>
                    </FormGroup>
                    
                    <FormGroup
                        controlId="location"
                        validationState={this.state.errors.location? 'error': null}
                        >
                        <ControlLabel>Location</ControlLabel>
                        <FormControl
                        name="location"
                        placeholder="Example: 100.00 / 100.0 / 100"
                        value={this.state.location ? this.state.location : this.props.auth.user.location}
                        onChange={this.onInputChange}
                        >
                        </FormControl>
                        <FormControl.Feedback/>
                        <HelpBlock>{this.state.errors.location?this.state.errors.location:null}</HelpBlock>
                    </FormGroup>
                    <button type="submit" className='btn btn-primary submit'>Publish</button>
                </form>
            </div>
        );
    }
}
const actions = { publishVoucher }
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, actions)(withRouter(VoucherForm));
