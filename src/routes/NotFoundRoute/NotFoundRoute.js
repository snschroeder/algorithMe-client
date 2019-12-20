import React, { Component } from 'react'
import './NotFound.css'

class NotFoundRoute extends Component {
  render() {
    return (
      <section>
        <div className='notfound-container'>
          <h2>404 - Page not found :(</h2>
          <p>Try going back to your previous page.</p>
        </div>

      </section>
    );
  }
}

export default NotFoundRoute
