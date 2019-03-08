/****************************************************************************************
 *  @Purpose        : Here we have to create a dashboard and it contains few components. 
 *  @file           : dashBoard.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import CreateNote from '../components/createNotes';
import AppbarComponent from '../components/appBar';
export default class dashBoard extends Component {
    constructor() {
        super();
        this.state = {
            cardStyles: false,
            slideCards: false
        }
        this.getNewNote = this.getNewNote.bind(this);
        this.slideCards = this.slideCards.bind(this);
    }
    getNewNote(newCard) {
        this.noteToCards.current.displayNewCard(newCard);
    }
    slideCards() {
        this.setState({ slideCards: !this.state.slideCards })
    }
    handleCardStyle() {
        this.setState({ cardStyles: !this.state.cardStyles });
    }
    render() {
        const slidingCards = this.state.slideCards ? "afterSlide" : "beforeSlide"
        return (
            <div className={slidingCards}>
                <AppbarComponent
                    slideCards={this.slideCards}
                    notePropsToApp={this.handleCardStyle}
                />
                <div className="setFixedMargin">
                    <div id="dashboard">
                        <CreateNote getNewNote={this.getNewNote} />
                    </div>
                </div>
            </div>
        )
    }
}