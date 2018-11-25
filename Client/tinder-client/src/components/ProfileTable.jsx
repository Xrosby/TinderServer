import React from 'react';
import {loadProfiles} from "../js/GraphQLClient";
import '../css/ProfileTable.css';

class ProfileTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            profiles: null
        }
    }


    handleLoad(data) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        console.log(data);
        this.setState({
            loading: false,
            profiles: data
        });
    }

    renderRows = () => {
        if (this.state.loading) {
            return;
        }

        let rows = [];
        for (let profile of this.state.data.allProfiles) {
            rows.push(<ProfileRow profile={profile}/>);
        }
        return rows;
    }


    render() {
        return (
            <div className="ProfileTable">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Navn</th>
                        <th>Alder</th>
                        <th>Job</th>
                        <th>Uddannelse</th>
                        <th>Interesser</th>
                        <th>Søger</th>
                        <th>Har børn</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderRows(loadProfiles(this.handleLoad.bind(this)))}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ProfileTable;

class ProfileRow extends React.Component {
    render() {

        return (

            <tr>
                <td>{this.props.profile.id}</td>
                <td>{this.props.profile.name}</td>
                <td>{this.props.profile.age}</td>
                <td>{this.props.profile.job}</td>
                <td>{this.props.profile.education}</td>
                <td>{this.props.profile.interests}</td>
                <td>{this.props.profile.lookingFor}</td>
                <td>{this.props.profile.parent}</td>
            </tr>

        );
    }
}