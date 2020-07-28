import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';


export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
        }
    }


    render() {
        return (
            <>
                <div className="nav-bar">
                    <div>ALGO-VISUALIZER</div>
                    <NavLink exact className="nav-link" activeClassName='active-link' to={!this.state.disabled ? '/' : ""}>Searching</NavLink>
                    <NavLink exact className="nav-link" activeClassName='active-link' to={!this.state.disabled ? '/sortingvisualizer' : ""}> Sorting</NavLink>
                </div>
            </>
        );
    }
}