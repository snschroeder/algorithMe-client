import React from 'react';
import images from '../../imgAssets/index'
import './Results.css';

export default function Results(props) {
  const {
    correct,
    nextWord,
    answer,
    guess,
    totalScore,
    handleNextClick,
  } = props;

  const findImage = (string) => {
    const idx = string.indexOf('.')
    return string.slice(0, idx)
  }

  const displayCorrect = () => {
    return (
      <section className="results" aria-live="polite">
        <div className="shadow">
          <h2 className="cypress" style={{ display: "none" }}>You were correct! :D</h2>
          <h3 className="results-h3">You were correct!</h3>
          <div className="DisplayScore">
            <p className="display-score-p">Your total score is: {totalScore}</p>
          </div>
          <div className="DisplayFeedback">
          <p className="display-feedback-p" style={{ display: 'none' }}>The correct translation for {nextWord} was {answer} and you chose {guess}!</p>
          </div>
          <h4 className="display-feedback-h4">The correct name for this algorithm</h4>
          <img className="results-img" src={images[`${findImage(nextWord)}`]} alt='algorithm question' />
          <p className="display-feedback-p">was {answer} and you chose {guess}!</p>
        </div>
        <button className="next-button" autofocus="true" type="button" onClick={() => { handleNextClick() }}>Try another word!</button>
      </section >
    )
  }

  const displayIncorrect = () => {
    return (
      <section className="results" aria-live="polite">
        <div className="DisplayScore">
          <p className="display-score-p">Your total score is: {totalScore}</p>
        </div>
        <div className="shadow">
          <h2 className="cypress" style={{ display: "none" }}>Good try, but not quite right :(</h2>
          <h3 className="results-h3">Good try, but not quite right</h3>

          <div className="DisplayFeedback">
          <p className="display-feedback-p" style={{ display: 'none' }}>The correct translation for {nextWord} was {answer} and you chose {guess}!</p>
          </div>
          <h4 className="display-feedback-h4">The correct name for this algorithm</h4>
          <img className="results-img" src={images[`${findImage(nextWord)}`]} alt='algorithm question' />
          <p className="display-feedback-p">was {answer} and you chose {guess}!</p>
        </div>
        <button className="next-button" type="button" autofocus="true" onClick={() => { handleNextClick() }}>Try another word!</button>
      </section>
    )
  }

  return (
    correct ? displayCorrect() : displayIncorrect()
  )
}