import React from 'react';
import FlipNumbers from 'react-flip-numbers';
import './FlipCounter.css';

const FlipCounter = ({ value, maxDigits = 2 }) => {
    return (
        <div className="flip-counter">
            <FlipNumbers
                height={150}
                width={105}
                color="#563232"
                background="#f0f0f0"
                play
                perspective={1000}
                numbers={value.toString()}
                numberStyles={{ fontFamily: 'Arial', fontSize: '2em' }}
                numberStylesDark={{ fontFamily: 'Arial', fontSize: '2em' }}
                maxDigits={maxDigits}
            />
        </div>
    );
};

export default FlipCounter;
