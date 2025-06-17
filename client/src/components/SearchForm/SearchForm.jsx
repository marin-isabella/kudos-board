import React from "react";
import { useState } from "react";

const SearchForm = ({ onSearch, onClear }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchQuery !== "") {
            onSearch(searchQuery);
        }
    }

    const handleClear = () => {
        setSearchQuery("");
        onClear();
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button className="search-button">Search</button>
            <button className="clear-button" onClick={handleClear}>Clear</button>
        </form>
    );
}

export default SearchForm;
