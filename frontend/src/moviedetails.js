import React from 'react';
import ReactDOM from 'react-dom';

export class MovieDetails extends React.Component {
    render() {
        if (!this.props.show){
            return null
        }
        return(
            <div>
                Testing
            </div>
        )
    }
}