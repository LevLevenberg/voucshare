import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authentication';
import { withRouter, Link } from 'react-router-dom';
import '../../style/buttnos.css';
import '../../style/App.css';
class EditUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            email: '',
            phone: '',
            location: '',
            errors: {},
            updated:false

        }
    }
    componentDidMount(){
        if(!this.props.auth.isAuthenticated)
        this.props.history.push('/login');
        else{
        const {username, email, phone, location} = this.props.auth.user;
        this.setState(() => ({
            username,
            email,
            phone,
            location}));
        }

    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.auth.user.username !== prevProps.auth.user.username||
            this.props.auth.user.email !== prevProps.auth.user.email||
            this.props.auth.user.phone !== prevProps.auth.user.phone||
            this.props.auth.user.location !== prevProps.auth.user.location
            ){
            this.setState({updated:true});
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
                    id: this.props.auth.user._id,
                    username: this.state.username,
                    email: this.state.email,
                    phone: this.state.phone,
                    location: this.state.location
                }
            this.props.updateUser(user, this.props.history);
    }
    render(){
        const errors = this.state.errors;       
        return(
            <div className="normalize">
                <form className='form' onSubmit={this.onSubmitForm}>
                <h3>Edit persolan info</h3>
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
                            type="text"
                            name="phone"
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
                    <button type="submit" className='btn btn-primary submit'>Update</button>
                </form>
                {this.state.updated &&
                    <div>
                     <p style={{color:"green"}}>Your account is updated successfuly</p>
                     <Link to="/home">Go to Home page</Link>
                    </div>}
            </div>
        );
    }
}
const actions = {updateUser}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}
export default connect(mapStateToProps, actions)(withRouter (EditUser));
