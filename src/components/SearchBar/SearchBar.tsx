import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBox from "../SearchBox";
import useSearch from "../../hooks/useSearch";

const SearchBar: React.FC = () => {
    const { query, setQuery } = useSearch();
    const [showResult, setShowResult] = useState<boolean>(false);

    useEffect(() => {
        if (query.length > 0) {
            setShowResult(true)
        } else {
            setShowResult(false)
        }
    }, [query]);
    
    return (
        <StyledContainer>
            <SearchInput 
                placeholder="Search Dispute by ID  🔍" 
                type="input"
                value={query}
                onChange={e => setQuery(e.target.value)}
                />
            {showResult && <SearchBox/>}
        </StyledContainer>
    );
};

const SearchInput = styled.input.attrs({
    className: 'w-100'
})` 
    min-width: 210px;
    max-width: 300px;
    text-indent: 15px;
    border: none;
    border-radius: 40px;
    background-color: rgba(250, 250, 250, 0.8);
    -webkit-box-shadow: 0px 6px 15px 1px rgba(0,0,0,0.2); 
    box-shadow: 0px 6px 15px 1px rgba(0,0,0,0.15);
    padding: 10px 0 10px 0;

    :focus-visible {
        outline: none;
    }
`;

const StyledContainer = styled.div`
    position: relative;
`;

export default SearchBar;