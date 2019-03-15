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
    constructor(props) {
        super(props);
        this.state = {
            cardStyles: false,
            slideCards: false
        }
        this.handleCardStyle = this.handleCardStyle.bind(this);
        this.slideCards = this.slideCards.bind(this);
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
                    slideCards={this.slideCards}
                    notePropsToApp={this.handleCardStyle}
                />
                <div className="setFixedMargin">
                    <div id="dashboard">
                        <CreateNote
                        />
                    </div>
                </div>
            </div>
        )
    }
}