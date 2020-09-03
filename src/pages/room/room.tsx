import React, { useState } from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom'

import MyRoom from './myRoom/MyRoom'
import RoomDetail from './room-detail/RoomDetail'
import AddOrUpdateRoom from './addOrUpdateRoom/AddOrUpdateRoom'

export default function Room() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/room/detail/:houseId" component={RoomDetail}/>
          <Route path="/room/addOrUpdateRoom" component={AddOrUpdateRoom}/>
          <Route path="/room" component={MyRoom}/>
        </Switch>
      </HashRouter>
    )
}