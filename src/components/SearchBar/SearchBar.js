import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.sortByOptions= {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.getSortByClass = this.getSortByClass.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map((sortByOption) => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li className={this.getSortByClass(sortByOptionValue)} 
                        key={sortByOptionValue}
                        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
                        >
                        {sortByOption}
                    </li>;
        });
    }

    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        })
    }
    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return '';
        } else {
            return 'active';
        };
    }

    handleTermChange(e){
        this.setState({ term: e.target.value})
    }
    handleLocationChange(e){
        this.setState({ location: e.target.value})
    }


    handleSearch(e){
        //text = e.target.value;
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        e.preventDefault();
    }
    render() {
        return <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" onChange={this.handleTermChange} />
          <input placeholder="Where?" onChange={this.handleLocationChange} />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Let's Go</a>
        </div>
      </div>

    }
}

export default SearchBar;