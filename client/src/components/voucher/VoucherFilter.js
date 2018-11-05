import React from 'react';
import { connect } from 'react-redux';
import { 
    setCategoryFilter,
    setSubcategoryFilter,
    setLocationFilter,
    setSearchTextFilter,
    sortByLowerPrice,
    sortByHigherPrice,
    resetFilters
    } from '../../actions/filterActions/filters';
import {Row, Col, InputGroup, FormGroup, FormControl, Glyphicon  } from 'react-bootstrap';
import '../../style/buttnos.css';

 

export class VoucherFilter extends React.Component{
    constructor(props){
        super(props);
    
    this.state = {
            sortBy: 'lower-price',
            category:'',
            categories:[],
  
        }
    }
    static getRetrievedStateFromProps(nextProps, prevState){
        if(nextProps.categories !== prevState.categories){
            return {categories: nextProps.categories}
        }
        return null;
    }
    render(){
        if(this.props.categories.length > 0){
        return(
            <Row style={{maxWidth:300}}>
                  <Col xs={12}  style={{marginBottom:10}}>
                  <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph = "search"/></InputGroup.Addon>
                        <FormControl type="text" 
                        placeholder="Search"
                        value={this.props.filters.searchText} 
                        onChange={(e)=>{
                            this.props.dispatch(setSearchTextFilter(e.target.value));
                        }}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12}>
                <FormGroup controlId="category">
                    <FormControl 
                        componentClass="select"
                        name="category"
                        onChange={(e)=>{
                            this.setState({
                                [e.target.name]:e.target.value,
                                reset:false
                                });
                            this.props.dispatch(setCategoryFilter(this.props.categories[parseInt(e.target.value)].categoryName));}}
                        >
                        <option className='option-title' selected={this.state.reset} value='' >Category</option>
                        {this.props.categories.map((category,index)=>
                            <option value={index} key={index}>{category.categoryName}</option>
                        )}
                    </FormControl>
                    </FormGroup>
                </Col>
                <Col xs={12}>
                <FormGroup controlId="subcategory">
                    <FormControl 
                        componentClass="select"
                        name="subcategory"
                        onChange={(e)=>{
                            this.props.dispatch(setSubcategoryFilter(e.target.value));}}
                        >
                        <option className='option-title' selected={this.state.reset} value='' >Subcategory</option>
                        {this.state.category !== '' && this.props.categories[this.state.category].subcategories.map( (subcategory,index) => 
                            <option 
                            value={subcategory.name} 
                            key={index}
                            >
                            {subcategory.name}</option>
                        )}
                    </FormControl>
                </FormGroup>
                </Col>
                <Col xs={12}>
                <FormGroup controlId="location">
                    <FormControl 
                        componentClass="select"
                        onChange={(e)=>{
                            this.props.dispatch(setLocationFilter(e.target.value));
                            }}
                            >
                        <option className='option-title' selected={this.state.reset} value='' >Location</option>
                        {this.props.locations.map((loc,index)=>(
                            <option value={loc.location} key={index}>{loc.location}</option>
                        ))}
                    </FormControl>
                </FormGroup>
                </Col>
                <Col xs={12}>
                <FormGroup controlId="subcategory">
                    <FormControl 
                        componentClass="select"
                        value={this.props.filters.sortBy}
                        onChange={(e)=>{
                            switch(e.target.value){
                                case 'lower-price':
                                    this.props.dispatch(sortByLowerPrice());
                                    this.setState(()=>({sortBy:'lower-price'}));
                                    break;
                                case 'higher-price':
                                    this.props.dispatch(sortByHigherPrice());
                                    this.setState(()=>({sortBy:'higher-price'}));
                                    break;
                                default:
                                    break;
                            }
                             }}
                        >
                        <option  value='lower-price'>Lower to Higher</option>
                        <option  value='higher-price'>Higher to Lower</option>
                    </FormControl>
                </FormGroup>
                </Col>
                <Col xs={12}>
                    <button className='submit'
                        onClick={() => {
                            this.props.dispatch(resetFilters());
                            this.setState({reset:true})
                            }
                        }
                        >
                        Reset Filters
                        </button>
                </Col>
            </Row>
        );}

        else return null;
    }
}

const mapStateToProps=(state)=>{
    return{
        categories: state.categories,
        locations: state.locations,
        filters: state.filters
    }
}
export default connect(mapStateToProps)(VoucherFilter);
