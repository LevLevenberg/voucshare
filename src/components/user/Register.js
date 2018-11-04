import React from 'react';
import isValid from '../../validation/password';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import {registerUser} from '../../actions/authentication';
import '../../style/buttnos.css';
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            email: '',
            phone: '',
            location: '',
            password:'',
            password_helper:'',
            passwordTextColor:'',
            errors:{}
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push("/")
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        if(e.target.name === 'password'){
        const passwordTextColor = isValid(this.state.password);
        this.setState(()=>({passwordTextColor}))}
    }

    onSubmitForm = (e) =>{
        e.preventDefault();
            const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_helper,
            phone: this.state.phone,
            location: this.state.location
            }
            this.props.registerUser(user, this.props.history);
    }
    render(){
        const errors = this.state.errors;
        const passwordStyle = {
            color:this.state.passwordTextColor
        }
       
        return(
            <div>
                <form onSubmit={this.onSubmitForm} className='form'>
                    <h3>Signup</h3>
                    <hr/>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"                            
                            value={this.state.username}
                            onChange={this.onInputChange}
                            className={classnames('form-control form-control-lg', {'is-invalid': errors.username})} 
                        />
                        {errors.username
                             && 
                            (<div className="invalid-feedback">
                                {errors.username}
                            </div>)
                        }
                    </div>   
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onInputChange}
                            className={classnames('form-control form-control-lg', {'is-invalid': errors.email})} 
                            />
                            {errors.email
                                 && 
                                (<div className="invalid-feedback">
                                    {errors.email}
                                </div>)
                            }
                    </div>                
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onInputChange}
                            className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} 
                            />
                            {errors.password
                                 && 
                                (<div className="invalid-feedback">
                                    {errors.password}
                                </div>)
                            }
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password_helper"
                            style={passwordStyle}
                            placeholder="Confirm password"
                            disabled={this.state.password.length<6}
                            value={this.state.password_helper}
                            onChange={this.onInputChange}
                            className={classnames('form-control form-control-lg', {'is-invalid': errors.password_confirm})} 
                            />
                            {errors.password_confirm
                                 && 
                                (<div className="invalid-feedback">
                                    {errors.password_confirm}
                                </div>)
                            }
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone number"
                            value={this.state.phone}
                            onChange={this.onInputChange}
                            className={classnames('form-control form-control-lg', {'is-invalid': errors.phone})} 
                            />
                            {errors.phone
                                && 
                                (<div className="invalid-feedback">
                                    {errors.phone}
                                </div>)
                            }
                    </div>
                    <div className="form-group">
                        <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={this.state.location}
                        onChange={this.onInputChange}
                        className={classnames('form-control form-control-lg', {'is-invalid': errors.location})} 
                        />
                        {errors.location
                             && 
                            (<div className="invalid-feedback">
                                {errors.location}
                            </div>)
                        }
                    </div>
                    <button type="submit" className='btn btn-primary submit'>Signup</button>

                     <Row style={{marginTop: 15}}>
                        <Col xs={4}></Col>
                        <Col xs={4} style={{textAlign: "center"}}>
                            <p >Already have an account?</p>
                            <Link to='/login'>Login</Link></Col>
                        <Col xs={4}></Col>
                    </Row>
                </form>
            </div>
        );
    }
}
const actions ={ registerUser }
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}
export default connect(mapStateToProps, actions)(withRouter(Register));

