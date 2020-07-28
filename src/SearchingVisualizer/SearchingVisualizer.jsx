import React from 'react';
import { randomIntFromInterval } from '../SortingVisualizer/SortingVisualizer';
import { getLinerSearchAnimation, getBinarySearchAnimation } from '../Algorithms/searchAlgorithms';
import './SearchingVisualizer.css';


export default class SearchVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            key: [],
            disabled: false,
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    
    //===============================DISABLE/ENABLE=========================================//

    disableButtons() {
        this.setState({disabled:true});
        const buttonStyles = document.getElementsByClassName("button");
        for (let value of buttonStyles) {
            value.style.color = "red";
        }
    }

    enableButtons(animatonLength) {
        setTimeout(() => {
            const buttonStyles = document.getElementsByClassName("button");
            for (let i = 0; i < buttonStyles.length; i++) {
                buttonStyles[i].style.color = i === 0 ? "white" : "#223f6e" ;
            }
             this.setState({ disabled: false });
        }, (animatonLength * 1000) + 3000);
    }
    //==========================GENERATE NEW SET OF ELEMENTS==================================//
    resetArray() {
        const array = [];
        for (let i = 0; i < 12; i++) {
            array.push(randomIntFromInterval(10, 200));
        }
        array.sort((a, b) => a - b);
        this.setState({ array });
    }

    //==========================BINARY SEARCH STARTS=========================================//


    binaySearch() {

        //=============================CHECK FOR THE PRESENCE OF THE KEY=================//
        if (!this.state.key.length) {
            const inputFieldStyle =  document.getElementsByTagName("input")[0].style;
            inputFieldStyle.boxShadow = " 1px 1px 5px 1px red";
            setTimeout(() => inputFieldStyle.boxShadow = "none",100);
            return;
        }

        this.disableButtons();
        const arrayElements = document.getElementsByClassName("array-elements");
        const animations = getBinarySearchAnimation(this.state.array, parseInt(this.state.key));
        this.enableButtons(animations.length);
        for (let i = 0; i < animations.length; i++) {
            //iterating for each animation ...
            const [mid, isEquall, left, right] = animations[i];
            const partialArrayStyle = [];
            //partialArrayStyle holds the elements index that may contain the key element....
            for (let i = left; i <= right; i++) {
                partialArrayStyle.push(arrayElements[i].style);
            }
            const midStyle = arrayElements[mid].style;
            //first time we change the color of the array elements(DOM) that need to be checked for the presence of the KEY element....
            if (i % 2 === 0) {
                setTimeout(() => {
                    partialArrayStyle.forEach((value) => {
                        value.backgroundColor = "#ff0000ad";
                    });
                    midStyle.backgroundColor = isEquall ? "#576115b3" : "#00FF00";
                    if(isEquall)
                        setTimeout(() => midStyle.backgroundColor = "#dbf3fa",3000);
                }, i * 1500);
            }
            // second time to retrive the color back to normal.....
            else {
                setTimeout(() => {
                    partialArrayStyle.forEach((value) => {
                        value.backgroundColor = "#dbf3fa";
                    });
                    midStyle.backgroundColor = "#dbf3fa";
                }, i * 1500);
            }
        }
    }

    //==============================BINARY SEARCH ENDS========================================//


    //==============================LINEAR SEARCH STARTS======================================//

    linerSearch() {

        //================Check for the presence of the key======================//
        if (!this.state.key.length) {
            const inputFieldStyle =  document.getElementsByTagName("input")[0].style;
            inputFieldStyle.boxShadow = " 1px 1px 5px 1px red";
            setTimeout(() => inputFieldStyle.boxShadow = "none",100);
            return;
        }

        this.disableButtons();
        const animations = getLinerSearchAnimation(this.state.array, parseInt(this.state.key));
        this.enableButtons(animations.length);
        for (let i = 0; i < animations.length; i++) {
            const [eleIdx, isEquall] = animations[i];
            const eleStyle = document.getElementsByClassName("array-elements")[eleIdx].style;

            if (i % 2 === 0) {
                // Change the color of the array elements during the comparision.=======
                setTimeout(() => {
                    eleStyle.backgroundColor = isEquall ? "#576115b3" : "#00FF00";
                    if(isEquall)
                        setTimeout(() => eleStyle.backgroundColor = "#dbf3fa",3000);
                }, i * 1000);
            }
            else {
                // Retrieve the original color of the elements=====================
                setTimeout(() => {
                    eleStyle.backgroundColor = "#dbf3fa";
                }, i * 1000);
            }
        }
    }

    //==============================LINEAR SEARCH ENDS====================================//   

    inputRead(e) {
        this.setState({ key: e.target.value });
    }

    render() {
        return (
            <div className="main">
                <div disabled={this.state.disabled} className="button shadow1 reset-button" onClick={() => !this.state.disabled ? this.resetArray() : ""}>Radomize</div>
                <div className="array-section shadow2">
                    {this.state.array.map((value, idx) => (
                        <div className="array-elements shadow1" key={idx}>{value}</div>
                    ))
                    }
                </div>
                <div className="bottom-tool-bar">
                    <input type="number" className="" value={this.state.key} placeholder="Enter key to be searched" onChange={this.inputRead.bind(this)} />
                    <div className="search-buttons">
                        <div className="button shadow1" onClick={() => !this.state.disabled ? this.linerSearch() : ""}>Liner Search</div>
                        <div className="button shadow1" onClick={() => !this.state.disabled ? this.binaySearch() : ""}>Binary Search</div>
                    </div>
                </div>
            </div>
        );
    }
}