import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks : [],
    portfolioStocks: [],
    filter: "all",
    sort: "none"
  }

  //INITIAL FETCH AND SETTING STATE TO FETCHED ITEMS

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stocksArr => this.setState({stocks : stocksArr}))
  }


  
  // ADDING STOCK COMPONENT FROM STOCK CONTAINER TO PORTFOLIO CONTAINER
  buyStock = (stockObj) => {
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stockObj]
    })
}

  // DELETING STOCK COMPONENT FROM THE DOM

  sellStock = (stockObj) => {

    //Delete single item

    let index = this.state.portfolioStocks.findIndex(stock => stock.id === stockObj.id)
    let resultArray = [...this.state.portfolioStocks]
    resultArray.splice(index,1)
    this.setState({
      portfolioStocks: resultArray
    })
  // Delete Multiple Items of same kind by Filtering out 
  //   this.setState({
  //   portfolioStocks : this.state.portfolioStocks.filter(stock => stock.id !== stockObj.id)
  // })
  }

//FILTER STATE BY WHAT THE VALUE OR "TYPE" IS IN EVENT

  filterStocks = (type) => {
    this.setState({
      filter: type
    })
  }

  sortStocks = (sortType) => {
    this.setState({
      sort: sortType,
      stocks: this.state.stocks.sort((a, b)=> 
      sortType === "Price" ? a.price - b.price 
      : a.name.localeCompare(b.name))
    })
  }


  render() {
  // CREATING A VARIABLE TO SET THE STATE OF THE STOCKS BEING SHOWN TO ACCORDING TO WHAT IS BEING CAUGHT IN THE FILTER BY ITS VALUE OR "TYPE"

    let displayStocks = []
    if (this.state.filter === "all") {
      displayStocks = this.state.stocks
    } else {
      displayStocks = this.state.stocks.filter(stock => stock.type === this.state.filter)
    }

    return (
      <div>
        <SearchBar filterStocks={this.filterStocks} sortStocks={this.sortStocks} sortedType={this.state.sort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={displayStocks} buyStock={this.buyStock} />

            </div>
            <div className="col-4">

              <PortfolioContainer portfolioStocks={this.state.portfolioStocks} sellStock={this.sellStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
