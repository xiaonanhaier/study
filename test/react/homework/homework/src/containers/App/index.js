import React, { Component } from 'react';
// import {PropTypes} from 'prop-types';
// import { Link} from 'react-router-dom';
class App extends Component {
    render(){
        return(
            <div>
                <h1>首页</h1>

                {this.props.children}
            </div>
            )

    }
}
export default App;