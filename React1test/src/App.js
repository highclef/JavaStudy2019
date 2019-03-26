import React, { Component } from 'react';
import './App.css';
import Restaurant from './Restaurant';


class App extends Component {
  
  state={
    
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        restaurants: [
          {
            title: "Soban",
            poster: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80"
          
          },
          {
            title:  "Gogimacha",
            poster: "https://images.unsplash.com/photo-1549396563-92fab230895a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
          },
          {
            title:   "Today",
            poster:  "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
          
          },
          { 
            title:   "Goal",
            poster:   "https://images.unsplash.com/photo-1501086975536-1220c4cf61f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
          
          },
          
          {
            title: "Hanguksikdang",
            poster: "https://images.unsplash.com/photo-1533137138-ba67dc90d752?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
    
          }
          
          ]
      })
    }, 5000)
  }

  _renderRestaurant = () =>{
    const restaurants = this.state.restaurants.map((restaurant, index) => {
        
      return <Restaurant title={restaurant.title} poster={restaurant.poster} key={index} />
    })

    return restaurants
  }
  render() {
    return (
      <div className="App">     
      {this.state.restaurants ? this._renderRestaurant: 'Loading'}     
      </div>
    );
  }
}



export default App;
