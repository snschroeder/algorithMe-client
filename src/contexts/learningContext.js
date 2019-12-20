import React, { Component } from 'react'

export const learn = {
    id: null,
    correct: null,
    words:[],
    user_id: null,
    total_score: null,
    language: []
}

const LearningContext = React.createContext({
    id: null,
    correct: null,
    words:[],
    user_id: null,
    total_score: null,
    language: [],
    setWords: () => {},
    setLanguage: () => {}
})

export default LearningContext

export class LearningProvider extends Component {
    state = {
        id: null,
        correct: null,
        words:[],
        user_id: null,
        total_score: null,
        language: []
    }

    setWords = (words) => {
        this.setState({
            words: words
        })
    }

    setLanguage = (language) => {
        this.setState({
            language: language,
        })
    }
    render() {
        const value = {
            words: this.state.words,
            user_id: this.state.user_id,
            total_score: this.state.total_score,
            language: this.state.language,
            setWords: this.setWords,
            setLanguage: this.setLanguage,
        }
        return (
            <LearningContext.Provider value={value}>
                {this.props.children}
            </LearningContext.Provider>
        )
    }

}