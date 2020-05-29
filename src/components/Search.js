import React, { Component } from 'react';

class Search extends Component {
    state = { location: '' };
    handleSubmit = (e) => {
        this.setState({
            location: e.target.value
        })
    }
    render() {
        const { SearchValue } = this.props;
        return <div className="container">
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Enter a location"></input>
                <button>Search</button>
            </form>
        </div>
    }

}

export default Search;