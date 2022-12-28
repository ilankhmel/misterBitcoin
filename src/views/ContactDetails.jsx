import { Component } from 'react'
import { Link } from 'react-router-dom'
import { MovesList } from '../cmps/MovesList'
import { TransferFund } from '../cmps/TransferFund'
import { contactService } from '../services/contact.service'
import { userService } from '../services/user.service'
import { setContact } from '../store/actions/contact.actions'
import { spendBalance } from '../store/actions/user.actions'
import {connect} from 'react-redux'

class _ContactDetails extends Component {

    state = {
        contact: null,
        nextId: null,
    }

    componentDidMount() {
        console.log(this.props);
        this.loadContact()
        // this.loadUser()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadContact()
        }
    }

    loadContact = async () => {
       const contact = await contactService.getContactById(this.props.match.params.id)
       this.setState({contact},()=>{
        console.log(this.state.contact)
        this.nextContactId()

       })
    }

    loadUser = () => {
        const user = this.props.user
        console.log(user);
        this.setState({user})
    }
 
    onBack = () => {
        this.props.history.push('/contact')
    }

    onTransferCoins = (move) => {
       this.props.spendBalance(move)
    }

    get movesWithContact () {
        const {user} = this.props
        const {contact} = this.state
        const userMoves = user?.moves || [] 
        return userMoves.filter(move => move.toId === contact._id)
       
    }

    nextContactId = async () => {
        console.log(this.state.contact);
        const id = await contactService.getNextId(this.state.contact._id)
        console.log(id);
        this.setState({nextId: id})
        return id
    }

    render() {
        const { user } = this.props
        const { contact, nextId } = this.state
        if (!contact || !user) return <div>Loading...</div>
        return (
            <section className='contact-details'>
                <section className="info">
                    <div className="img">
                        <img className="contact-img" src={"https://robohash.org/set_set5/" + contact._id} alt="" />
                    </div>
                    <div className="about">
                        <h2>Name: {contact.name}</h2>
                        <h4>Phone: {contact.phone}</h4>
                        <h4>Email: {contact.email}</h4>
                        <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
                    </div>
                </section>

                <TransferFund contact={contact} maxCoins={user.coins} onTransferCoins={this.onTransferCoins} />
                <MovesList title="Your Moves:" movesList={this.movesWithContact} />
                <button onClick={this.onBack}>Back</button>
                {nextId &&
                <button onClick={()=>this.props.history.push(`/contact/${nextId}`)}>Next contact</button>
                }
            </section>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userModule.loggedInUser,
})

const mapDispatchToProps = {
    spendBalance,
}

export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)