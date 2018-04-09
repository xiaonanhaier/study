import React, { Component } from 'react';
// import {PropTypes} from 'prop-types';
import { HashRouter as Router, Route,Switch} from 'react-router-dom';

import {Header,Nav} from "../../components/index";
import {Shouye} from "../index";
import "./App.css"

class App extends Component {
    render(){
        let imgListPath = `${this.props.match.path}/`;
        return(
            <div>
                <Header></Header>
                <Nav></Nav>

                <div className="content">
                    <Router>
                        <Switch>
                            <Route path={imgListPath} component={Shouye} />
                        </Switch>
                    </Router>
                </div>
            </div>
            )

    }
}
export default App;