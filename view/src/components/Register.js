import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';


const mapStateToProps = state => ({ ...state.auth });


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }), 
  onChangeName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'name', value }),
  onChangeSurname: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'surname', value }),
  onChangeBio: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'bio', value }),
  onChangePicture: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'profilePicture', value }),
  onSubmit: (email, password, name) => {
    const payload = agent.Auth.register(email, password, name);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev =>this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeName = ev => this.props.onChangeName(ev.target.value);
    this.changeSurname = ev => this.props.onChangeSurname(ev.target.value);
    this.changeBio = ev => this.props.onChangeBio(ev.target.value);
    this.changePicture= ev =>this.props.onChangePicture(ev.target.value);
    this.submitForm = (email, password, name, surname, bio, profilePicture) => ev => {
      console.log("email "+ email);
      ev.preventDefault();
      this.props.onSubmit(email, password, name);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const name = this.props.name;
    const surname = this.props.surname;
    const bio = this.props.bio;
    const profilePicture = this.props.profilePicture;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(email, password, name)}>
                <fieldset>


                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.email}
                      onChange={this.changeEmail}/>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password" 
                      value={this.props.password}
                      onChange={this.changePassword}/>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="First Name"
                      value={this.props.name}
                      onChange={this.changeName}
 />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Last Name"
                      value={this.props.surname}
                      onChange={this.changeSurname}  />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Bio" 
                      value={this.props.bio}
                      onChange={this.changeBio} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Profile Picture Url" 
                      value={this.props.profilePicture}
                      onChange={this.changePicture} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign up
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
