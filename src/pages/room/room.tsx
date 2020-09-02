import React, { useState } from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom'

import MyRoom from './myRoom/MyRoom'
import RoomDetail from './room-detail/RoomDetail'
import AddRoom from './add-room/AddRoom'
import UpdateRoom from './update-room/UpdateRoom';

export default function Room() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/room/detail/:houseId" component={RoomDetail}/>
          <Route path="/room/addRoom" component={AddRoom}/>
          <Route path="/room/updateRoom" component={UpdateRoom}/>
          <Route path="/room" component={MyRoom}/>
        </Switch>
      </HashRouter>
    )
}