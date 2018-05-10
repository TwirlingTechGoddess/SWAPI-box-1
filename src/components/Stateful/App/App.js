import React, { Component } from 'react';
import '../../../reset.css'
import Intro from '../Intro/Intro'
import CardDisplay from '../../Stateless/CardDisplay/CardDisplay'
import Header from '../Header/Header'
import Helper from '../../Helper/Helper'
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      favorites:[],
      selectedData: [],
      loading: false,
      helper: new Helper()
    }
  }

  makeApiCall = async (category) => {
    const selectedData = await this.state.helper.makeApiCall(category)
    return this.setState({selectedData: selectedData})
  }

  findCard = (card) => {
    const selectedCard = this.state.selectedData.find(data => card.data.id === data.id)
    this.addCardToFavorites(selectedCard)
  }

  addCardToFavorites = (card) => {
    const currentFavorites = this.state.favorites;
    const duplicate = currentFavorites.some(favCard => {
      return favCard.id === card.id;
    });
    if (!duplicate){
      currentFavorites.push(card)
    } else {
      let index = currentFavorites.indexOf(card)
      currentFavorites.splice(index, 1)
    }
    this.setState({
      favorites: currentFavorites
    })  
  }	   

  displayFavorites = () => {
    const favoriteCards = this.state.favorites;
    if (!favoriteCards.length){
      console.log('no hay nada')
    }
    this.setState({
      selectedData: favoriteCards
    })
  }

  render() {

    if (this.state.loading) {

    }


    if (this.state.selectedData.length){
      return (
        <div>
          <Header makeApiCall={this.makeApiCall} 
            favoritesLength={this.state.favorites.length}
            displayFavorites={this.displayFavorites}
          />             
          <CardDisplay 
            selectedData={this.state.selectedData}
            findCard={this.findCard}
            favorites={this.state.favorites}
          />
        </div>
      )
    }
    
    else if (!this.state.selectedData.length){
      return (
        <div className="App">
          <Header 
            makeApiCall={this.makeApiCall} 
            favoritesLength={this.state.favorites.length}
            displayFavorites={this.displayFavorites}          
          />   
          <Intro />
        </div>
      );
    } 
      
  }
}

export default App;
