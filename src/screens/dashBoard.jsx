import React, { Component } from 'react';
import ShowCards from '../components/showCards';
import AppbarComponent from '../components/appBar';
class Dashboard extends Component {
    constructor() {
        super();
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
        this.getNewNote = this.getNewNote.bind(this);
        this.slideCards = this.slideCards.bind(this);
    }

    // searchLabels(value) {
    //     this.setState({ label: value });
    //     console.log("search labels", value);
    //     this.noteToCards.current.displayLabelledCards();
    // }

    getNewNote(newCard) {
        this.noteToCards.current.displayNewCard(newCard);
    }

    // getSearchedNotes(value) {
    //     this.setState({ searchNote: value })
    // }

    slideCards() {
        this.setState({ slideCards: !this.state.slideCards })
    }

    handleCardStyle() {
        this.setState({ cardStyles: !this.state.cardStyles });
    }

    // handleNavigation(reminder, archive, trash) {
    //     console.log("handleNAvigation", reminder, archive, trash);

    //     if (reminder === true || archive === true || trash === true) {
    //         this.setState({
    //             reminder: reminder,
    //             archive: archive,
    //             trash: trash
    //         })
    //     } else {
    //         this.setState({
    //             reminder: false,
    //             archive: false,
    //             trash: false
    //         })
    //     }
    // }

    makeLabelFalse() {
        this.noteToCards.current.makeLabelFalse();
    }
    render() {
        const slidingCards = this.state.slideCards ? "afterSlide" : "beforeSlide"
        return (
            <div className={slidingCards}>
                <AppbarComponent
                    //  makeLabelFalse={this.makeLabelFalse}
                     slideCards={this.slideCards}
                    //  searchLabels={this.searchLabels}
                      notePropsToApp={this.handleCardStyle}
                    // handleNavigation={this.handleNavigation}
                    //  getSearchedNotes={this.getSearchedNotes}
                />
                <div className="setFixedMargin">
                    <div id="dashboard">
                         <ShowCards getNewNote={this.getNewNote} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;
