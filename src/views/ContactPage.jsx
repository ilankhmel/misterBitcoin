import { Component } from 'react'
import { userService } from '../services/user.service'
import {connect} from 'react-redux'
import { contactService } from '../services/contact.service'
import { bitcoinService } from '../services/bitcoin.service'
import { ContactList } from '../cmps/ContactList'
import { ContactDetails } from '../views/ContactDetails'
import { ContactFilter } from '../cmps/ContactFilter'
import { Link } from 'react-router-dom'
import { loadContacts, setFilterBy } from '../store/actions/contact.actions'

class _ContactPage extends Component {

    async componentDidMount(){
        console.log(this.props.user);
        if(!this.props.user) this.props.history.push('/')
        this.props.loadContacts()
    }
    
    // loadContacts = async () => {
    //     try{
    //         const contacts = await contactService.getContacts(this.state.filterBy)
    //         this.setState({contacts}) 
    //     }catch(err){ 
    //         console.log(err);
    //     }
    // }


    onChangeFilter = (filterBy) => {
        this.props.setFilterBy(filterBy)
        this.props.loadContacts()
    }

    render() {
        const { contacts, filterBy} = this.props
        if(!contacts) return <div>Loading...</div>
        return (
        <section className='contact-index'>
                <>
                    <div className="contact-header">
                        <ContactFilter onChangeFilter={this.onChangeFilter} filterBy={filterBy}/>
                        <Link to="/contact/edit">+</Link>
                    </div>
                    <ContactList contacts={contacts} /> 
                </>
        </section>  
        )
  }
}

const mapStateToProps = state => ({
    contacts: state.contactModule.contacts,
    filterBy: state.contactModule.filterBy,
    user: state.userModule.loggedInUser
})

const mapDispatchToProps = {
    loadContacts,
    setFilterBy
}

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)