import { Component } from 'react'
import { connect } from 'react-redux'
import { MovesList } from '../cmps/MovesList'
import { bitcoinService } from '../services/bitcoin.service'
import { userService } from '../services/user.service'
import { logout } from '../store/actions/user.actions'

class _HomePage extends Component {

    state = {
        user: null,
        bitcoinRate: null,
    }

    async componentDidMount(){
        this.loadUser()
        await this.getRate()
        if(!this.state.user){
            console.log('s');
            this.props.history.push('/signup')
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.bitcoinRate !== this.state.bitcoinRate){
            this.getRate()
        }
    }
    loadUser = () => {
        const user = userService.getUser()
        console.log(user);
        this.setState({user}) 
    }

    getRate = async () => {
        const rate = await bitcoinService.getRate()
        console.log(rate);
        this.setState({bitcoinRate: rate})
    }

    onLogOut = () => {
        // userService.logout()
        this.props.logout()
        this.props.history.push('/signup')
    }

    render() {
        const { user, bitcoinRate } = this.state
        if(!user || !bitcoinRate) return <div>Loading...</div>
        return (
            <section className='home-page'>
                <h2>Hello {user.name}!</h2>
                <img src={`https://robohash.org/set_set5/${100}`} alt="" />
                <h4>Coins: {user.coins}</h4>
                <h4>BTC: {bitcoinRate}</h4>
                <button onClick={this.onLogOut}>Log Out</button>
                <MovesList title="Your Moves" movesList={user.moves.slice(0,5)}/>
            </section>
        )
    }
}

const mapDispatchToProps = {
   logout,
}


export const HomePage = connect(null, mapDispatchToProps)(_HomePage)