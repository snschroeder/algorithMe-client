import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import Results from './Results';
import images from '../../imgAssets/index'
import './LearningRoute.css'


class LearningRoute extends Component {
  state = {
    guess: '',
    answer: '',
    nextWord: '',
    prevWord: null,
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    qAnswered: false,
    isCorrect: null,

  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok) ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(result => { 
        this.setState(result) 
        this.setState({ prevWord: result.nextWord })
      })
  }

  handleNextClick = () => {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok) ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(result => {
   
        this.setState({
          qAnswered: false,
          answer: '',
          guess: '',
          totalScore: result.totalScore,
          nextWord: result.nextWord,
          wordCorrectCount: result.wordCorrectCount,
          wordIncorrectCount: result.wordIncorrectCount,
          prevWord: result.nextWord,
        })
        console.log(result)
      })
      
  }

  updateAnswer = (e) => {

    this.setState({
      guess: e.target.value
    })
  }
  handleAnswer = (e) => {
    e.preventDefault()
    const { guess } = this.state;
 
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        guess: guess
      })
    })
      .then(res =>
        (!res.ok) ? res.json().then(e => Promise.reject(e))
          : res.json()
      ).then(result => {
        this.setState({ qAnswered: true })
        this.setState(result)
        })
  }

  findImage = (string) =>{
    const idx = string.indexOf('.')
    return string.slice(0, idx)
  }

  // {totalScore}
  // {this.state.nextWord}

  displayQuestion = () => {
    const { nextWord, wordCorrectCount, wordIncorrectCount, totalScore } = this.state
    return (
      <section className='learn-main container' aria-live="polite">
        <h2 className="cypress" style={{ display: 'none' }}>Translate the word:</h2>
        <h3 className="learn-main-h2">What is the name of this algorithm?</h3>
        <span style={{ display: 'none' }}>{nextWord}</span>
        <p className="learn-main-total">Your total score is: {totalScore}</p>
        <div className='test-main'>
          <img src={images[`${this.findImage(nextWord)}`]} alt='algorithm question' />
          <span className="score">You have answered this word correctly {wordCorrectCount} times.</span>
          <span className="score">You have answered this word incorrectly {wordIncorrectCount} times.</span>
        </div>
        <form className="answer-form" onSubmit={this.handleAnswer}>
          <label htmlFor="learn-guess-input" className="guess-label" style={{ display: 'none' }}>What's the translation for this word?</label>
          <input id="learn-guess-input" type="text" autofocus="true" onChange={this.updateAnswer} required></input>
          <button type="submit">Submit your answer</button>
        </form>
      </section>
    )
  }


  render() {
    const {
      answer,
      totalScore,
      guess,
      prevWord,
      qAnswered,
      isCorrect,
    } = this.state;



    return (
      <>
        {qAnswered
          ? <Results
            correct={isCorrect}
            nextWord={prevWord}
            answer={answer}
            guess={guess}
            totalScore={totalScore}
            handleNextClick={this.handleNextClick}
          />
          : this.displayQuestion()
        }
      </>
    );
  }
}

export default LearningRoute
