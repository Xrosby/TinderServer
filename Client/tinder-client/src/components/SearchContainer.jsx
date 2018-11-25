import React from 'react';
import ProfileTable from './ProfileTable';
import {loadProfiles} from '../js/GraphQLClient';

class SearchContainer extends React.Component {


    render() {
        return (
            <div>
                <h1>Overview etc </h1>
                <ProfileTable/>
            </div>
        );
    }


}


export default SearchContainer;