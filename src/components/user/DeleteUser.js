import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux'
import { withRouter, Link } from  'react-router-dom';
import { Row, Col } from 'react-bootstrap'; 
import { deleteUser , logoutUser} from '../../actions/authentication';

class DeleteUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password:'',
            verification:false,
            errors:{},
            success:{}
        }
    }
    componentDidMount(){
        this.setState({
            errors:{},
        })
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
        if(nextProps.success.deleteUser){
            this.props.logoutUser(this.props.history);
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errors:{}
        });
    }

    onSubmitForm = (e) =>{
        e.preventDefault();
        this.setState({
            verification:true
        });
    }
    
    onDeleteAccount= () =>{
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.deleteUser(user);
    }

    render(){
        return(
            <div className='normalize'>
                <form onSubmit={this.onSubmitForm} className='form'>
                <h3>Delete my account</h3>
                <p>In order to delete your account, please indentify yourself with email and password</p>
                <hr/>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onInputChange}
                            className={classnames('form-control form-control-lg', {'is-invalid': this.state.errors.email})} 
                            />
                            {this.state.errors.email
                                 && 
                                (<div className="invalid-feedback">
                                    {this.state.errors.email}
                                </div>)
                            }
                    </div>                                 
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Old password"
                            value={this.state.password}
                            onChange={this.onInputChange}
                            className={classnames('form-control form-control-lg', {'is-invalid': this.state.errors.password})} 
                            />
                            {this.state.errors.password
                                 && 
                                (<div className="invalid-feedback">
                                    {this.state.errors.password}
                                </div>)
                            }
                    </div>                    
                    <button type="submit" className='btn btn-primary submit'>Submit</button>
                </form>
                <p style={{color:"red"}}>{this.state.errors.warning}</p>
                {this.state.verification &&
                <div>
                <br/>
                <h4 style={{textAlign:'center'}}>Are you sure?</h4>
                <Row style={{textAlign:'center'}}>
                    <Col xs={6}><Link to="/home">Go back to Homepage</Link></Col>
                    <Col xs={6} style={{cursor:'pointer'}}><p onClick={this.onDeleteAccount}>Delete Account</p></Col>
                </Row>
                </div>}
            </div>
        );
    }
}
const actions = { deleteUser, logoutUser }
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
        success: state.success
    }
}
export default connect(mapStateToProps, actions)(withRouter(DeleteUser));
