import React, {useEffect, useState} from 'react';
import {Configure, connectAutoComplete, InstantSearch} from "react-instantsearch-dom";
import Autosuggest from "react-autosuggest";
import {useRouter} from "next/router";
import algoliasearch from "algoliasearch/lite";

const Search = props => {
    const router = useRouter()
    const searchClient = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APPID,
        process.env.NEXT_PUBLIC_ALGOLIA_APIKEY_SEARCH
    );
    const AutoComplete = connectAutoComplete(
        ({ hits, currentRefinement, refine }) => (
            <Autosuggest
                suggestions={hits}
                onSuggestionsFetchRequested={({ value }) => refine(value)}
                onSuggestionsClearRequested={() => refine('')}
                getSuggestionValue={hit => hit.uid}
                renderSuggestion={hit => (
                    <div className="bg-white hover:bg-blue-500 p-2 text-sm rounded hover:text-white mt-1 cursor-pointer" onClick={() => router.push('/region/' + hit.uid)}>
                        <div className="flex">
                            <img src={hit.useruuid !== "EVENT" ? `https://crafatar.com/avatars/${hit.useruuid}`:"/logo.png"} className="w-1/4 h-1/4" alt=""/>


                            <div className="ml-2">
                                <b>{hit.username}</b>
                                <p>{hit.city}</p>
                                <p className="text-gray-300 italic text-xs">{hit.uid}</p>
                            </div>
                        </div>
                    </div>
                    )
                }
                inputProps={{
                    placeholder: 'Search',
                    className: "focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md shadow-lg",
                    value: currentRefinement,
                    onChange: () => {},
                }}
            />
        )
    );
    return (
        <div>
            <InstantSearch searchClient={searchClient} indexName="regions">
                <Configure hitsPerPage={5} />
                <AutoComplete />
            </InstantSearch>
            <a href="https://www.algolia.com/"><img width="50%" className="mt-1" src="/search-by-algolia.svg" alt=""/></a>


        </div>
    );
}

export default Search
