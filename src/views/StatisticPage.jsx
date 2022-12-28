import { Component } from 'react'
import { Chart } from '../cmps/Chart'
import { bitcoinService } from '../services/bitcoin.service'


export class StatisticPage extends Component {

  state = {
    market: null,
    transactions: null,
  } 

  componentDidMount(){
    this.getMarketPrice()
    this.getConfirmedTransactions()
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.market !== this.market) {
    //   this.getMarketPrice()
    //   this.getConfirmedTransactions()
    // }
}

  async getMarketPrice(){
    const res = await bitcoinService.getMarketPrice()
    const data = this.makeCoords(res.values)
    this.setState({
      market: {
        data,
        name: res.name,
        desc: res.description,
      }})
  }
  
  async getConfirmedTransactions(){
    const res = await bitcoinService.getConfirmedTransactions()
    const data = this.makeCoords(res.values)
    this.setState({
      transactions: {
        data,
        name: res.name,
        desc: res.description,
      }})
  }

  makeCoords(coordsObj){
    return coordsObj.map(obj => obj.y)
  }

  render() {
    const {market, transactions} = this.state
    if(!market || !transactions) return <div>Loading...</div>
    return (
      <section className='statistics'>
          <section className='chart-section'>
            <Chart name={market.name} data={market.data} desc={market.desc} color='blue'/>
          </section>
          <section className='chart-section'>
            <Chart name={transactions.name} data={transactions.data} desc={transactions.desc} color='green'/>
          </section>
        </section>
    )
  }
}
