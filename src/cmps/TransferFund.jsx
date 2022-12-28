import { Component } from 'react'

export class TransferFund extends Component {
    state = {
        move: null,
    }

    componentDidMount(){
        const contact = this.props.contact
        this.setState({
            move: {
                toId: contact._id,
                to: contact.name,
            }
           }
        )
    }

    handleChange = ({target}) => {
        this.setState(prevState => ({move: {...prevState.move, amount: +target.value, at: Date.now()}}))
    }
    
    transfer = (ev) => {
        ev.preventDefault()
        if(this.state.move.amount > this.props.maxCoins) return
        this.props.onTransferCoins(this.state.move)
        this.setState(prevState => ({move: {...prevState.move, amount: 0}}))
    }

    render() {
        const {move} = this.state
        const {contact, maxCoins} = this.props
        return (
            <section className='transfer-section'>
               <h3>Transfer coins to {contact.name}</h3>
               <form className='transfer-form'>
                    <label htmlFor="amount">Amount:</label>
                    <input onChange={this.handleChange} value={move?.amount ? move.amount : ''} type="text" name="amount" id="amount" />
                    <button onClick={this.transfer}>Transfer</button>
               </form>
               {(move?.amount > maxCoins) &&
               <div>Not enough coins</div>
               }
            </section>
        )
    }
}
