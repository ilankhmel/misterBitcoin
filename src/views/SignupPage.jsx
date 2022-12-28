import { Component } from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/user.service'
import { signup } from '../store/actions/user.actions'

class _SignupPage extends Component {
    state = {
        username: ''
    }

    handleChange = ({target}) => {
        const key = target.name
        let value = target.value

        this.setState(prevState => ({username: value}))
    }

    onSignUp = () => {
        if(!this.state.username) return
        this.props.signup(this.state.username)
        this.props.history.push('/')
    }

    render() {
        const {username} = this.state
        return (
            <section className='signup-page'>
                <img src="https://goldingroupcpas.com/wp-content/webp-express/webp-images/uploads/2022/02/bitc.png.webp" alt="" />
                <h2>Please enter your name:</h2>
                <input onChange={this.handleChange} value={username} type="text" name='username' />
                <button onClick={this.onSignUp}>Sign Up</button>
            </section>
        )
    }
}

const mapDispatchToProps = {
    signup,
}

export const SignupPage = connect(null, mapDispatchToProps)(_SignupPage)
