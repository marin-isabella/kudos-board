import React from "react";
import { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ onSearch, onClear }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        if (value === "") {
            onClear();
        } else {
            onSearch(value);
        }
    }

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
            <input type="text" placeholder="Search" value={searchQuery} onChange={handleInputChange}/>
            <button type="submit" className="search-button">Search</button>
            <button className="clear-button" onClick={handleClear}>Clear</button>
        </form>
    );
}

export default SearchForm;
