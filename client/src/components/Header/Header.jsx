import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';
import FiltersBar from '../FiltersBar/FiltersBar';

const Header = ({ onSearch, onClear}) => {
    return (
        <>
            <header className="header">
                <div className="header-info">
                    <h1 className="header-title">KUDOBOARD</h1>
                    <div className="header-search">
                        <SearchForm onSearch={onSearch} onClear={onClear}/>
                    </div>
                    <div className="header-filters">
                        <FiltersBar />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
