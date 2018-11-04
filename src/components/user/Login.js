import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom';
import {loginUser} from '../../actions/authentication';
import { Row, Col } from 'react-bootstrap';
import'../../style/buttnos.css';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password:'',
            errors:{}
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push("/");
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
    }
    onSubmitForm = (e)=>{
        e.preventDefault();
            const user = {
                email: this.state.email,
                password: this.state.password
            }
            this.props.loginUser(user,this.props.history);
    }
    render(){
        const errors = this.state.errors;
       
        return(
            <div>
                {this.state.errors.warning && <p style = {{color:"red"}}>{this.state.errors.warning}</p>}
                <form onSubmit={this.onSubmitForm} className='form'>
                    <h3>Login</h3>
                    <hr/>
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
                    {/*password input element*/}
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
                    <button type="submit" className='btn btn-primary submit'>Login</button>
                    <Row style={{marginTop: 15}}>
                        <Col xs={4}></Col>
                        <Col xs={4} style={{textAlign: "center"}}>
                            <p >Or</p>
                            <Link to='/register'>Sign Up</Link></Col>
                        <Col xs={4}></Col>
                    </Row>
                </form>
            </div>
        );
    }
}
const actions = { loginUser }
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}
export default connect(mapStateToProps, actions)(withRouter(Login));
