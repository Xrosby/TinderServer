import React from 'react';

class NavBar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">Tinder Cruncher</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><a href="/search">Search</a></li>
                        <li><a href="/create">Create</a></li>
                    </ul>
                </div>
            </nav>


        );
    }
}

export default NavBar;