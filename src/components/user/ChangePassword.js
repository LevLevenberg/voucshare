import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux'
import { withRouter } from  'react-router-dom';
import { changePassword } from '../../actions/authentication';
import '../../style/buttnos.css'

const initState={
    email: '',
    password:'',
    password_helper:'',
    errors:{},
    success:{},
}

class ChangePassord extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password:'',
            password_helper:'',
            errors:{},
            success:{},
            show:""
        }
    }
    componentDidMount(){
        this.setState({
            errors:{},
            success:{}
        })
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
                show:"errors"
            });
        }
        if(nextProps.success){
            this.setState({
                success:nextProps.success,
                show:"success"
            });
        }
        else{
            this.setState(()=>({...initState}));
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errors:{}
        });
    }

    onSubmitForm = (e)=>{
        e.preventDefault();
            const user = {
                email: this.state.email,
                oldPassword: this.state.password,
                newPassword: this.state.password_helper
            }
            this.props.changePassword(user, this.props.history);
    }
    

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmitForm} className="form">
                <h3>Change Password</h3>
                <hr/>
                {<div className="form-group">
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
                    }                    
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
                    <div className="form-group">
                        <input
                            type="password"
                            name="password_helper"
                            placeholder="New password"
                            disabled={this.state.password.length<6}
                            value={this.state.password_helper}
                            onChange={this.onInputChange}
                            className={classnames('form-control form-control-lg', {'is-invalid': this.state.errors.newPassword})} 
                            />
                            {this.state.errors.newPassword
                                 && 
                                (<div className="invalid-feedback">
                                    {this.state.errors.newPassword}
                                </div>)
                            }
                    </div>
                    <button type="submit" className='btn btn-primary submit'>Change Password</button>
                </form>
                <p style={{color:"red"}}>{this.state.errors.warning}</p>
                <p style={{color:"green"}}>{this.state.success.changePassword}</p>
            </div>
        );
    }
}
const actions = { changePassword }
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
        success: state.success
    }
}
export default connect(mapStateToProps, actions)(withRouter(ChangePassord));
