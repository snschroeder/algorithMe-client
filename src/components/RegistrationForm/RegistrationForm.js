import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <div className='alert' role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          {/* <Label htmlFor='registration-name-input'>
            Enter your name<Required />
          </Label> */}
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
            placeholder='Enter you name'
          />
        </div>
        <div>
          {/* <Label htmlFor='registration-username-input'>
            Choose a username<Required />
          </Label> */}
          <Input
            id='registration-username-input'
            name='username'
            required
            placeholder='Choose a username'
          />
        </div>
        <div>
          {/* <Label htmlFor='registration-password-input'>
            Choose a password<Required />
          </Label> */}
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            required
            placeholder='Choose a password'
          />
        </div>
        <footer>
          <Button type='submit'>
            Sign up
          </Button>
          {' '}
          <Link to='/login' style={{ textDecoration: 'none'}}>Already have an account?</Link>
        </footer>
      </form>
    )
  }
}

export default RegistrationForm
