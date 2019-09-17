import React, { Component } from 'react';
import Navbar from './Navbar';
import Container from './Container';
import Footer from './Footer';
import Banner from './Banner';
import images from '../images';
// import Winner from './Winner';

class ClickyGame extends Component {
    state = {
        score: 0,
        highScore: 0,

        // Stores the class value to assign to navMessage based on a good or bad click
        navMsgColor: '',

        // Contains intro, success, and failure message
        navMessage: 'Click an image to begin!',

        // Contains an array of image urls

        allCharacters: this.shuffleArray(),

        // Array to track clicked elements
        wasClicked: [],

        // Shakes the container of images on an incorrect guess if set to true
        shake: false
    };

    //Yay
    // Why isnt this working
    // Binds the current this context to checkClicked to have access to the current state when passed down to the Character component
    clickEvent = this.checkClicked.bind(this);

    // Used to shuffle the array of images when the DOM loads, and when an image is clicked
    shuffleArray() {
        // Creates a copy of the current characters array to modify it by value, and not by reference
        const newArr = images.slice();

        // Array to store the shuffled array
        const shuffleArr = [];

        // Each loop through an index gets spliced from newArr, reducing its length gets a random index based off the current length of newArr splices the value from newArr, and pushes it to shuffleArr
        while (newArr.length > 0) {
            shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
        }

        return shuffleArr;
    }

    checkClicked(clickedElem) {
        // Creates a copy of the wasClicked array to modify it by value, and not by reference. wasClicked stores all previous clicked images
        const prevState = this.state.wasClicked.slice();

        // Shuffles the images
        const shuffled = this.shuffleArray();

        // Tracks score
        let score = this.state.score;
        let highScore = this.state.highScore;

        // If the clicked item is not in wasClicked, then it hasn't been clicked and the score is increased
        if (!this.state.wasClicked.includes(clickedElem)) {
            if (score >= 12) {
                //set to winner
            }

            // If score is greater than or equal to highScore are the same, then there is a new highScore value
            if (score >= highScore) {
                score++;
                highScore++;
            }
            // If they are not equal, then only increase the score value
            else {
                score++;
            }

            // Adds the clicked item to wasClicked to track that it has been clicked
            prevState.push(clickedElem);
        }

        // Resets the current score if the same element was clicked twice
        if (this.state.wasClicked.includes(clickedElem)) {
            let score = 0;
            return this.setState({
                score: score,
                highScore: highScore,
                navMsgColor: 'incorrect',
                navMessage: 'Incorrect guess!',
                allCharacters: shuffled,
                wasClicked: [],
                shake: true
            });
        }

        // If this runs, then the same element has not been clicked twice and the score is increased
        this.setState({
            score: score,
            highScore: highScore,
            navMsgColor: 'correct',
            navMessage: 'You Guessed Correctly!',
            allCharacters: shuffled,
            wasClicked: prevState,
            shake: false
        });

        // Removes the green correct indicator on a successful click after .5s to re-render the class on each success
        return setTimeout(() => this.setState({ navMsgColor: '' }), 500);
    }

    // Renders score to the navbar. Passes the randomized state.allCharacters array to Container to create a Character component for each image. Passes the this.checkClicked down to container to pass to each Character component to be used for the click event.
    render() {
        const state = this.state;
        return (
            <div>
                <Navbar
                    score={state.score}
                    highScore={state.highScore}
                    navMessage={state.navMessage}
                    navMsgColor={state.navMsgColor}
                />
                <Banner />
                <Container
                    shake={state.shake}
                    characters={state.allCharacters}
                    clickEvent={this.clickEvent}
                />
                <Footer />
            </div>
        );
    }
}

export default ClickyGame;
