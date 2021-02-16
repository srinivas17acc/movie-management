import React, { Component, Fragment } from 'react';
//import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import './CreateMovies.css';
import LoadingIndicator from '../common/LoadingIndicator'
import { Link } from 'react-router-dom';



import { Form, Input, Button, notification, Avatar, Card, List } from 'antd';

const FormItem = Form.Item;

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {           
            movies: props.movies ? props.movies : [],
            page: 0,
            doPagination: false
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePagingInc = this.handlePagingInc.bind(this);
        this.handlePagingDec = this.handlePagingDec.bind(this);
        
    }


componentDidMount() {
    console.log(this.props);
    const {socket } = this.props;
    socket.send(
        JSON.stringify({
            command: 'MOVIE_GET_ALL',
            message: JSON.stringify({page: `${this.state.page}`, size: "1"})
        })
    )
    socket.onmessage = message => {
        const data = JSON.parse(message.data);
        this.setState({movies: data});
    }
}
componentDidUpdate() {
    console.log(this.props);
    const {socket } = this.props;
    if(this.state.doPagination){
        socket.send(
            JSON.stringify({
                command: 'MOVIE_GET_ALL',
                message: JSON.stringify({page: `${this.state.page}`, size: "1"})
            })
        )
        this.setState({doPagination: false})
    }
    
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
    handlePagingInc(){
        this.setState((prevState) => ({
            allowPrev: prevState.page > 0 ,
            page : prevState.page+1,
            doPagination: true
        }));

    }

    handlePagingDec() {
        this.setState((prevState) => ({
            allowNext: true,
            page : prevState.page-1,
            doPagination: true
        }));
    }
    render() {
        const {movies} = this.state;
        console.log(this.state,'movies info');
        if(!movies) return(<LoadingIndicator />);
        return (
            <div className="signup-container">
                <h1 className="page-title">Create New Movie</h1>
                <div className="signup-content">
                    {
                        movies.map(movie => {
                            const movieDetails = Object.keys(movie).map((key )=> ({key: key, value: movie[key]}) )
                        return(<Card
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
            
                    >
                        <Card.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={movie.name}
                            description={movie.description}
                        />
                        <List
                            size="small"
                            header={<div>Header</div>}
                            footer={<div>Footer</div>}
                            bordered
                            dataSource={movieDetails}
                            renderItem={item => <List.Item>{item.key + ": " + item.value}</List.Item>}
                        />
                    </Card>
                        )})}
                                        
               
                </div>
                <Button onClick={this.handlePagingDec}>prev</Button>
                <Button onClick={this.handlePagingInc}>next</Button>
            </div>
        );
    }

}

export default MovieList;