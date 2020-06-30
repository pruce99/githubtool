import React, { Component } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Test from "./Test";
import Backlog from "./Backlog";
import Slack from "./Slack";
import './CSS/Parent.css'

export default class Parent extends Component {
  constructor() {
    super();
    this.state = {
      showgit: false,
      showback: false,
      showslack: false,
      showmenu: false
    };
  }

  onclickhandlergit = () => {
    this.setState({
      showgit: true,
      showback: false,
      showslack: false,
      showmenu: false
    });
  };
  onclickhandlerback = () => {
    this.setState({
      showgit: false,
      showback: true,
      showslack: false,
      showmenu: false
    });
  };
  onclickhandlerslack = () => {
    this.setState({
      showgit: false,
      showback: false,
      showslack: true,
      showmenu: false
    });
  };

  handlemenu = () => {
    console.log(this.state.showmenu);
    this.setState({ showmenu: !this.state.showmenu });
  };

  render() {
    return (
      <div>
        <GiHamburgerMenu className="setting" onClick={this.handlemenu}></GiHamburgerMenu>
        <div className={this.state.showmenu ? "show" : "none"}>
          <div className='setting' onClick={this.onclickhandlergit}>GIT</div>
          <div className='setting' onClick={this.onclickhandlerback}>BACKLOG</div>
          <div className='setting' onClick={this.onclickhandlerslack}>SLACK</div>
        </div>
        <div>{this.state.showgit ? <Test></Test> : <div></div>}</div>
        <div>{this.state.showback ? <Backlog></Backlog> : <div></div>}</div>
        <div>{this.state.showslack ? <Slack></Slack> : <div></div>}</div>
      </div>
    );
  }
}
