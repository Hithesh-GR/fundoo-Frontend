/****************************************************************************************
 *  @Purpose        : Here we have to create a dashboard and it contains few components. 
 *  @file           : dashBoard.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import CreateNote from '../components/createNotes';
import Notes from '../components/notes'
import AppbarComponent from '../components/appBar';
export default class dashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "",
            cardStyles: false,
            reminder: false,
            archive: false,
            trash: false,
            searchNote: "",
            slideCards: false
        }
        this.noteToCards = React.createRef();
        this.handleCardStyle = this.handleCardStyle.bind(this);
        this.getNewNote = this.getNewNote.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);
        this.getSearchedNotes = this.getSearchedNotes.bind(this);
        this.slideCards = this.slideCards.bind(this);
    }
    searchLabels(value) {
        this.setState({ label: value });
        console.log("search labels", value);
        this.noteToCards.current.displayLabelledCards();
    }
    getSearchedNotes(value) {
        this.setState({ searchNote: value })
    }
    handleNavigation(reminder, archive, trash) {
        console.log("handleNAvigation", reminder, archive, trash);
        if (reminder === true || archive === true || trash === true) {
            this.setState({
                reminder: reminder,
                archive: archive,
                trash: trash
            })
        } else {
            this.setState({
                reminder: false,
                archive: false,
                trash: false
            })
        }
    }
    makeLabelFalse() {
        this.noteToCards.current.makeLabelFalse();
    }
    /**
     * @description:it creates the new created note
     * @param {*getting created newCard} newCard 
     */
    getNewNote(newCard) {
        try {
            this.noteToCards.current.displayNewCard(newCard);
        } catch (err) {
            console.log("error at getNewNote in dashBoard");
        }
    }
    /**
     * @description:it performs the card action
     */
    slideCards() {
        try {
            this.setState({ slideCards: !this.state.slideCards })
        } catch (err) {
            console.log("error at slideCards in dashBoard");
        }
    }
    /**
     * @description:it handles the cards style
     */
    handleCardStyle() {
        try {
            this.setState({ cardStyles: !this.state.cardStyles });
        } catch (err) {
            console.log("error at handleCardStyle in dashBoard");
        }
    }
    render() {
        const slidingCards = this.state.slideCards ? "afterSlide" : "beforeSlide"
        return (
            <div className={slidingCards}>
                <AppbarComponent
                    props={this.props}
                    makeLabelFalse={this.makeLabelFalse}
                    slideCards={this.slideCards}
                    searchLabels={this.searchLabels}
                    notePropsToApp={this.handleCardStyle}
                    handleNavigation={this.handleNavigation}
                    getSearchedNotes={this.getSearchedNotes}
                />
                <div className="setFixedMargin">
                    <div id="dashboard">
                        <CreateNote getNewNote={this.getNewNote} />
                        <Notes
                            noteProps={this.state.cardStyles}
                            searchNote={this.state.searchNote}
                            ref={this.noteToCards}
                        />
                    </div>
                </div>
            </div>
        )
    }
}