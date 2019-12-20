import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import config from '../../config'
import images from '../../imgAssets/index'

import './Dashboard.css'

import LearningContext from '../../contexts/learningContext'


class DashboardRoute extends Component {

  static contextType = LearningContext;

  setStudy = () => {
    this.setState({
      studyMode: true
    })
  }


  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok) ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(result => {
        this.context.setWords(result.words);
        this.context.setLanguage(result.language);
      })
  }

  findImage = (string) =>{
    const idx = string.indexOf('.')
    return string.slice(0, idx)
  }
  render() {

    const { language } = this.context;

    return (
        <section className='dash-container'>
          <div className='category-container'>
            <div className="language-header">
              <h2 className="dash-h2">{language.name}</h2>
              <h4 className="dash-h4">Total correct answers: {language.total_score}</h4>
            </div>
            <div className="dash-body">
              <Link tabIndex={1 } style={{ textDecoration: 'none' }} to='/learn'>Start practicing</Link>
              <h3 className="cypress" style={{ display: 'none'}}>Words to practice</h3>
              <h4 className="dash-h3">Algorithms to practice</h4>

            </div>

          </div>
          <section className='study-display-container'>
            <ul className="q-list">
              {this.context.words.map(word => (
                <li className='qcontainer' key={word.id}>
                  <h4 className="cypress" style={{ display: 'none' }}>{word.original}</h4>
                  <h5 className="qcontainer-h5">{word.translation}</h5>
                  <p className="qcontainer-p">correct answer count: {word.correct_count}</p>
                  <p className="qcontainer-p">incorrect answer count: {word.incorrect_count}</p>
                  <img src={images[`${this.findImage(word.original)}`]} alt='algorithm question' />
                </li>
              ))}
            </ul>
          </section>
        </section>
    );
  }
}

export default DashboardRoute


