
import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "../views/Home";
import AdvertisementNode from "../views/AdvertisementNode";
import Increase from "../views/Increase"
import Edit from "../views/Edit"
import Test from "../views/Test";


class RouterView extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/advertisement_nodes" component={AdvertisementNode}/>
                <Route exact path="/increase" component={Increase}/>
                <Route path="/edit/:id" component={Edit}/>
                <Route path="/test" component={Test}/>
            </Switch>
        );
    }
}

export default RouterView;