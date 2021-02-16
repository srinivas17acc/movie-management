import React, { Component, Fragment } from 'react';
//import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import './CreateMovies.css';
import MovieList from './MovieList';
import { Link } from 'react-router-dom';



import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class CreateMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: {
                value: ''
            },
            Description: {
                value: ''
            },
            RealeaseDate: {
                value: ''
            },
            Rating: {
                value: ''
            },
            TicketPrice: {
                value: ''
            },
            Country: {
                value: ''
            },
            Genre: {
                value: ''
            },
            Photo: {
                value: ''
            },
            movies: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        // this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                //...validationFun(inputValue)
            }
        });
    }
componentDidMount() {
    console.log(this.props);
}
    handleSubmit(event) {
        event.preventDefault();
    
        const movieRequest = {
            name: this.state.Name.value,
            description: this.state.Description.value,
            realeaseDate: this.state.RealeaseDate.value,
            rating: this.state.Rating.value,
            ticketPrice: this.state.TicketPrice.value,
            country: this.state.Country.value,
            realeaseDate: this.state.Genre.value,
            photo: this.state.Photo.value
        };
       debugger;
        const {socketObj} = this.props;

        //   socket.onmessage = evt => {
            
        //     const message = JSON.parse(movieRequest)
        //     this.setState({dataFromServer: message})
        //     console.log(message)
        //     }

           const data = {
                command : 'CREATE_MOVIE',
                message : JSON.stringify(movieRequest)
           }
           socketObj.onmessage = (message) => {
               console.log(message.data);
               
               this.setState({movies: JSON.parse(message.data)})
           }
          socketObj.send(JSON.stringify(data));
          
           // signup(signupRequest)
        // .then(response => {
        //     notification.success({
        //         message: 'Polling App',
        //         description: "Thank you! You're successfully registered. Please Login to continue!",
        //     });          
        //     this.props.history.push("/login");
        // }).catch(error => {
        //     notification.error({
        //         message: 'Polling App',
        //         description: error.message || 'Sorry! Something went wrong. Please try again!'
        //     });
        // });
    }

    isFormInvalid() {
        return false;
        return !(this.state.Name.validateStatus === 'success' &&
            this.state.Description.validateStatus === 'success' &&
            this.state.RealeaseDate.validateStatus === 'success' &&
            this.state.Rating.validateStatus === 'success' &&
            this.state.TicketPrice.validateStatus === 'success' &&
            this.state.Country.validateStatus === 'success' &&
            this.state.Genre.validateStatus === 'success' &&
            this.state.Photo.validateStatus === 'success' 
        );
        
    }

    render() {
        const {movies} = this.state;
        console.log(this.state,'movies info');
        return (
            <div className="signup-container">
                <h1 className="page-title">Create New Movie</h1>
                <div className="signup-content">

                        <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem label="Name"
                            validateStatus={this.state.Name.validateStatus}
                            help={this.state.Name.errorMsg}>
                            <Input 
                                size="large"
                                name="Name" 
                                autoComplete="off"
                                placeholder="Name"
                                value={this.state.Name.value} 
                               // onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.ValidDescription)} />    
                        </FormItem>
                        <FormItem label="Description"
                            validateStatus={this.state.Description.validateStatus}
                            help={this.state.Description.errorMsg}>
                            <Input 
                                size="large"
                                name="Description" 
                                autoComplete="off"
                                placeholder="Description"
                                value={this.state.Description.value} 
                               // onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.ValidDescription)} />    
                        </FormItem>
                        <FormItem 
                            label="RealeaseDate"
                            hasFeedback
                            validateStatus={this.state.RealeaseDate.validateStatus}
                            help={this.state.RealeaseDate.errorMsg}>
                            <Input 
                                size="large"
                                name="RealeaseDate" 
                                //type="email" 
                                autoComplete="off"
                                placeholder="RealeaseDate"
                                value={this.state.RealeaseDate.value} 
                               // onBlur={this.validateEmaivallAvailability}
                                onChange={(event) => this.handleInputChange(event, this.ValidRealeaseDate)} />    
                        </FormItem>
                        <FormItem 
                            label="Rating"
                            validateStatus={this.state.Rating.validateStatus}
                            help={this.state.Rating.errorMsg}>
                            <Input 
                                size="large"
                                name="Rating" 
                               // type="password"
                                autoComplete="off"
                                placeholder="Rating" 
                                value={this.state.Rating.value} 
                                onChange={(event) => this.handleInputChange(event, this.ValidRating)} />    
                        </FormItem>

                        <FormItem 
                            label="TicketPrice"
                            validateStatus={this.state.TicketPrice.validateStatus}
                            help={this.state.TicketPrice.validateStatus}>
                            <Input 
                                size="large"
                                name="TicketPrice"
                                autoComplete="off"
                                placeholder="TicketPrice"
                                value={this.state.TicketPrice.value} 
                                onChange={(event) => this.handleInputChange(event, this.ValidTicketPrice)} />    
                        </FormItem>
                        <FormItem label="Country"
                            hasFeedback
                            validateStatus={this.state.Country.validateStatus}
                            help={this.state.Country.errorMsg}>
                            <Input 
                                size="large"
                                name="Country" 
                                autoComplete="off"
                                placeholder="Country"
                                value={this.state.Country.value} 
                               // onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.ValidCountry)} />    
                        </FormItem>
                        <FormItem 
                            label="Genre"
                            hasFeedback
                            validateStatus={this.state.Genre.validateStatus}
                            help={this.state.Genre.errorMsg}>
                            <Input 
                                size="large"
                                name="Genre" 
                                //type="email" 
                                autoComplete="off"
                                placeholder="Genre"
                                value={this.state.Genre.value} 
                               // onBlur={this.validateEmaivallAvailability}
                                onChange={(event) => this.handleInputChange(event, this.ValidGenre)} />    
                        </FormItem>
                        <FormItem 
                            label="Photo"
                            validateStatus={this.state.Photo.validateStatus}
                            help={this.state.Photo.errorMsg}>
                            <Input 
                                size="large"
                                name="Photo" 
                               // type="password"
                                autoComplete="off"
                                placeholder="Photo" 
                                value={this.state.Photo.value} 
                                onChange={(event) => this.handleInputChange(event, this.ValidPhoto)} />    
                        </FormItem>
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>CreateMovie</Button>
                            Already registed? <Link to="/login">Login now!</Link>
                        </FormItem>
                    </Form>
                </div>
                
            </div>
        );
    }

    // Validation Functions

    validateName = (name) => {
        if(name.length <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: `(Name should enter.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
    ValidDescription = (name) => {
        if(name.length <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: `(Description should enter.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    ValidRating = (name) => {
        if(name.length <= 0 && name.length > 11) {
            return {
                validateStatus: 'error',
                errorMsg: `(ValidRating should enter.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
   

    ValidTicketPrice = (name) => {
        if(name <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: `(ValidTicketPrice should enter.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    ValidCountry = (name) => {
        if(name <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: `(ValidCountry should enter.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
   

    ValidTicketPrice = (name) => {
        if(name <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: `(ValidTicketPrice should enter.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
    ValidGenre = (name) => {
        if(name <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: `(ValidGenre should enter.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
    ValidPhoto = (name) => {
        if(name <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: `(ValidGenre should enter.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    // validateUsernameAvailability() {
    //     // First check for client side errors in username
    //     const usernameValue = this.state.username.value;
    //     const usernameValidation = this.validateUsername(usernameValue);

    //     if(usernameValidation.validateStatus === 'error') {
    //         this.setState({
    //             username: {
    //                 value: usernameValue,
    //                 ...usernameValidation
    //             }
    //         });
    //         return;
    //     }

    //     this.setState({
    //         username: {
    //             value: usernameValue,
    //             validateStatus: 'validating',
    //             errorMsg: null
    //         }
    //     });

    //     checkUsernameAvailability(usernameValue)
    //     .then(response => {
    //         if(response.available) {
    //             this.setState({
    //                 username: {
    //                     value: usernameValue,
    //                     validateStatus: 'success',
    //                     errorMsg: null
    //                 }
    //             });
    //         } else {
    //             this.setState({
    //                 username: {
    //                     value: usernameValue,
    //                     validateStatus: 'error',
    //                     errorMsg: 'This username is already taken'
    //                 }
    //             });
    //         }
    //     }).catch(error => {
    //         // Marking validateStatus as success, Form will be recchecked at server
    //         this.setState({
    //             username: {
    //                 value: usernameValue,
    //                 validateStatus: 'success',
    //                 errorMsg: null
    //             }
    //         });
    //     });
    // }

    // validateEmailAvailability() {
    //     // First check for client side errors in email
    //     const emailValue = this.state.email.value;
    //     const emailValidation = this.validateEmail(emailValue);

    //     if(emailValidation.validateStatus === 'error') {
    //         this.setState({
    //             email: {
    //                 value: emailValue,
    //                 ...emailValidation
    //             }
    //         });    
    //         return;
    //     }

    //     this.setState({
    //         email: {
    //             value: emailValue,
    //             validateStatus: 'validating',
    //             errorMsg: null
    //         }
    //     });

    //     checkEmailAvailability(emailValue)
    //     .then(response => {
    //         if(response.available) {
    //             this.setState({
    //                 email: {
    //                     value: emailValue,
    //                     validateStatus: 'success',
    //                     errorMsg: null
    //                 }
    //             });
    //         } else {
    //             this.setState({
    //                 email: {
    //                     value: emailValue,
    //                     validateStatus: 'error',
    //                     errorMsg: 'This Email is already registered'
    //                 }
    //             });
    //         }
    //     }).catch(error => {
    //         // Marking validateStatus as success, Form will be recchecked at server
    //         this.setState({
    //             email: {
    //                 value: emailValue,
    //                 validateStatus: 'success',
    //                 errorMsg: null
    //             }
    //         });
    //     });
    // }

    // validatePassword = (password) => {
    //     if(password.length < PASSWORD_MIN_LENGTH) {
    //         return {
    //             validateStatus: 'error',
    //             errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
    //         }
    //     } else if (password.length > PASSWORD_MAX_LENGTH) {
    //         return {
    //             validationStatus: 'error',
    //             errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
    //         }
    //     } else {
    //         return {
    //             validateStatus: 'success',
    //             errorMsg: null,
    //         };            
    //     }
    // }

}

export default CreateMovie;