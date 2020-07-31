import React from 'react';
import './SortingVisualizer.css';
import { getBubbleSortAnimation, getInsertionSortAnimation, getSelectionSortAnimation, getMergeSortAnimations, getQuickSortAnimation } from '../Algorithms/sortAlgorithms.js';


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            disabled: false,
            mount:true,
        }
    }

    componentDidMount() {
        this.resetArray();
    }


//===================GENERATRE NEW SET OF ELEMENTS=========================//
    resetArray() {
        const arr = [];
        const maxWidth = document.getElementsByClassName("bar-section")[0].offsetWidth;
        for (let i = 0; i < (maxWidth / 5) - 1; i++) {
            arr.push(randomIntFromInterval(10, 560));
        }
        this.setState({ array: arr });
    }

//==========================DISABLE/ENABLE===============================//
    disableButtons() {
        this.setState({ disabled: true });
        const buttonStyles = document.getElementsByClassName("button");
        for (let values of buttonStyles) {
            values.style.color = "#ff0000c2";
        }
    }

    enableButtons() {
        const buttonStyles = document.getElementsByClassName("button");
        for (let i = 0; i < buttonStyles.length; i++) {
            buttonStyles[i].style.color = i === 0 ? "#f5f4f4" : "#4286f4";
        }
        this.setState({ disabled: false });
    }


// ===============================POST ANIMATION EFFECT=======================//    
    postAnimation(length, speedF) {
        setTimeout(() => {
            const arrayBars = document.getElementsByClassName("array-bar");
            for (let i = 0; i < this.state.array.length; i++) {
                setTimeout(() => {
                    arrayBars[i].style.backgroundColor = "green";
                    document.getElementsByClassName("bar-section")[0].style.boxShadow = "inset 0px 5px 6px 7px green";
                }, i * 10);
            }

            setTimeout(() => {
                for (let i = 0; i < this.state.array.length; i++) {
                    arrayBars[i].style.backgroundColor = "#20232a";
                }
                document.getElementsByClassName("bar-section")[0].style.boxShadow = "inset 0px 5px 6px 7px #20232a";
                this.enableButtons();
            }, (this.state.array.length * 10) + 1000);
        }, (length + 1) * speedF + 1000);
    }

// ============================ANIMATION HELPER TO SWAP THE ELEMENTS===============//

    animationHelper(animations, speedF) {
        const arrayBars = document.getElementsByClassName("array-bar");

        this.postAnimation(animations.length, speedF);

        for (let i = 0; i < animations.length; i++) {
            const [barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            if (i % 2 === 0) {
                setTimeout(() => {
                    animations.pop();
                    barOneStyle.backgroundColor = "yellowgreen";
                    barTwoStyle.backgroundColor = "yellowgreen";
                    let tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
                }, (i + 1) * speedF);
            }
            else {
                setTimeout(() => {
                    animations.pop();
                    barOneStyle.backgroundColor = "#20232a";
                    barTwoStyle.backgroundColor = "#20232a";
                }, (i + 1) * speedF);
            }
        }
    }

//=================BUBBLE SORT STARTS===========================//

    bubbleSort() {
        this.disableButtons();
        setTimeout(() => {
            const animations = getBubbleSortAnimation(this.state.array);
            this.animationHelper(animations, 3);
        }, 500);
    }


//=================INSERTION SORT STARTS===========================//

    insertionSort() {
        this.disableButtons();
        setTimeout(() => {
            const animations = getInsertionSortAnimation(this.state.array);
            this.animationHelper(animations, 6);
        }, 500);
    }

//===============================SELECTION SORT STARTS===========================//
    selectionSort() {
        this.disableButtons();
        setTimeout(() => {
            const animations = getSelectionSortAnimation(this.state.array);
            this.animationHelper(animations, 50);
        }, 500);
    }


//==============================MERGE SORT STARTS=====================================//
    mergeSort() {
        this.disableButtons();
        setTimeout(() => {
            const animations = getMergeSortAnimations(this.state.array);
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const isColorChange = i % 3 !== 2;
                if (isColorChange) {
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = i % 3 === 0 ? "yellow" : "#20232a";
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, (i + 1) * 3);
                } else {
                    setTimeout(() => {
                        const [barOneIdx, newHeight] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;

                    }, (i + 1) * 3);
                }
            }
            this.postAnimation(animations.length,3);
        }, 500);
    }


//=================================QUICK SORT STARTS===========================//    
    quickSort(array) {
        this.disableButtons();
        setTimeout(() => {
            const animations = getQuickSortAnimation(this.state.array);
            const arrayBars = document.getElementsByClassName("array-bar");
            for (let i = 0; i < animations.length; i++) {
                const [pivot, leftBar, rightBar] = animations[i];
                const pivotStyle = arrayBars[pivot].style;
                const leftBarStyle = arrayBars[leftBar].style;
                const rightBarStyle = arrayBars[rightBar].style;
                if (i % 2 === 0) {
                    setTimeout(() => {
                        pivotStyle.backgroundColor = "yellow";
                        leftBarStyle.backgroundColor = "red";
                        rightBarStyle.backgroundColor = "red";
                        let temp = leftBarStyle.height;
                        leftBarStyle.height = rightBarStyle.height;
                        rightBarStyle.height = temp;
                    }, i * 20);
                }
                else {
                    setTimeout(() => {
                        pivotStyle.backgroundColor = "#20232a";
                        leftBarStyle.backgroundColor = "#20232a";
                        rightBarStyle.backgroundColor = "#20232a";
                    }, i * 20);
                }
            }
            this.postAnimation(animations.length, 20);
        }, 500);
    }

//=======================SORT FUNCTIONS ENDS=======================//


    render() {
        const { array } = this.state;
        return (
            <div className="array-container">
                <div className="side-bar">
                    <div className="button-grp">
                        <div className="button" onClick={() => !this.state.disabled ? this.resetArray() : ""}> Randomize </div>
                        <div className="button" onClick={() => !this.state.disabled ? this.bubbleSort() : ""}> Bubble Sort </div>
                        <div className="button" onClick={() => !this.state.disabled ? this.insertionSort() : ""}> Insertion Sort </div>
                        <div className="button" onClick={() => !this.state.disabled ? this.selectionSort() : ""}> Selection Sort </div>
                        <div className="button" onClick={() => !this.state.disabled ? this.mergeSort() : ""}> Merge Sort </div>
                        <div className="button" onClick={() => !this.state.disabled ? this.quickSort() : ""}> Quick Sort </div>
                    </div>
                </div>

                <div className="bar-section">
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{ height: `${value}px` }}>.</div>
                    ))}
                </div>
            </div>
        );
    }
}

export function randomIntFromInterval(min, max) {
    return Math.abs(Math.floor(Math.random() * (max - min + 1) - min));
}