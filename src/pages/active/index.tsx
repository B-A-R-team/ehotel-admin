import React, { useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Active from './active'
import AddOrUpdateActive from './addOrUpdateActive/AddOrUpdatective'
import ActiveDetail from './active-detail/ActiveDetail'

export default function ActiveRoute() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/active/detail/:id" component={ActiveDetail} />
                <Route path="/active/update/:id" component={AddOrUpdateActive} />
                <Route path="/active/add" component={AddOrUpdateActive} />
                <Route path="/active" component={Active} />
            </Switch>
        </HashRouter>
    )

}
