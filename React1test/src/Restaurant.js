import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Restaurant.css';


class Restaurant extends Component{

  static propTypes ={
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  }

    render(){
        return(
            <div>
              <RestaurantPoster poster={this.props.poster} />
            <h1>{this.props.title}</h1>
            </div>
        )
        
    }
}


class RestaurantPoster extends Component{

  static propTypes = {
    poster: PropTypes.string.isRequired

  }

  render(){
   
    return(
      <img src={this.props.poster} />

    )
  }
}

export default Restaurant;