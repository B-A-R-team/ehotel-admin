import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EHotelInfoUpdate from '../update/update'
import EHotelInfo from '../EHotelInfo'
export default () => {
    return (
        <Switch>
            <Route path="/" component={EHotelInfo} exact />
            <Route path="/eHotelInfo/update/:id" component={EHotelInfoUpdate}   />
        </Switch>
    )
}