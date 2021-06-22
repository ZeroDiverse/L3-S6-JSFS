import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Students from "./students/Students";
import Groups from "./groups/Groups";
import Navbar from './navbar/Navbar';

const Router = () => {
    return (
        <div className={'container'}>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path={'/students'}>
                        <Students />
                    </Route>
                    <Route path={'/groups'}>
                        <Groups />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Router
