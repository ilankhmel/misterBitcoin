import { Component } from 'react'
import { contactService } from '../services/contact.service'
export class ContactEdit extends Component {

    state = {
        contact: contactService.getEmptyContact(),
    }

    async componentDidMount(){
        const contactId = this.props.match.params.id
        if(contactId){
            const contact = await contactService.getContactById(contactId)
            this.setState({contact})
        }
    }

    handleChange = ({target}) => {
        const key = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break
            default:
                break;
        }

        this.setState(prevState => ({contact: {...prevState.contact, [key]: value}}))
    }

    onAddContact = async (ev) => {
        ev.preventDefault()
        try{
            const contact = await contactService.saveContact({...this.state.contact})
            this.props.history.push(`/contact/${this.state.contact._id ? this.state.contact._id : contact._id}`)
        }catch(err){
            console.log(err);
        }
    }

    onRemoveContact = async () => {
        try{
            await contactService.deleteContact(this.state.contact._id)
            this.onBack()
        }catch(err){
            console.log(err);
        }
    }

    onBack = () => {
        this.props.history.push(`/contact/${this.state.contact._id}`)
    }

    render() {
        const {contact} = this.state
        if(!contact) return <div>Loading...</div>
        const {name, phone, email} = contact
        return (
        <section className='contact-edit'>
            <h1>{contact._id ? 'Edit' : 'Add new'} contact</h1>
            <form >
                <label htmlFor="name">Name:</label>
                <input onChange={this.handleChange} value={name} type="text" name='name' id='name'/>

                <label htmlFor="phone">Phone:</label>
                <input onChange={this.handleChange} value={phone} type="text" name='phone' id='phone'/>

                <label htmlFor="email">Email:</label>
                <input onChange={this.handleChange} value={email} type="text" name='email' id='email'/>
                <button onClick={this.onAddContact}>Save</button>
            </form>
            
            <button onClick={this.onBack}>Back</button>
            {contact._id ? <button onClick={this.onRemoveContact}>Delete</button> : ''}
            
        </section>

        )
  }
}
