import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Students from "./students/Students";
import Groups from "./groups/Groups";

const Router = () => {
    return (
        <div className={'container'}>
            <BrowserRouter>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img
                                src="data:image/png;base64,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"
                                width="112" height="28"/>
                        </a>
                        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                           data-target="navbarBasicExample">
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <Link className="navbar-item" to={'/'}>
                                Home
                            </Link>

                            <Link className="navbar-item" to={'/students'}>
                                Students
                            </Link>

                            <Link className="navbar-item" to={'/groups'}>
                                Groups
                            </Link>
                        </div>
                        <div className="navbar-end"/>
                    </div>
                </nav>
                <Switch>
                    <Route path={'/students'}>
                        <Students/>
                    </Route>
                    <Route path={'/groups'}>
                        <Groups/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Router
