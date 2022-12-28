import { Component } from 'react'

export  class ContactFilter extends Component {

    state = {
        filterBy: null,
    }

    componentDidMount(){
        const filterBy = this.props
        this.setState({filterBy: {...filterBy}})
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState(
            prevState => ({ filterBy: { ...prevState.filterBy, term: value } }),
            () => this.props.onChangeFilter({ ...this.state.filterBy })
        )

    }

    render() {
        const {filterBy} = this.state
        if(!filterBy) return <div>Loading...</div>
        const {term} = filterBy

        return (
        <section className='contact-filter'>
            <input type="text" onChange={this.handleChange} value={term} placeholder='Search'/>
        </section>

        )
    }
}
