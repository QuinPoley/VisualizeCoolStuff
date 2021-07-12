import './App.css';
import React, { useState, useContext } from 'react';
import {CSSTransition} from 'react-transition-group';
import { ReactComponent as Github } from './Icons/Github.svg';
import { ReactComponent as Caret } from './Icons/caret.svg';
import { ReactComponent as Chevron } from './Icons/chevron.svg';
import { ReactComponent as Arrow } from './Icons/arrow.svg';
//import { ReactComponent as Settings } from './Icons/Settings.svg';
import View from './View.js'
//var isSelect = React.useContext("false");

function App() {
  return (
    <div className="App">
      <NavBar>
        <NavBarItem icon={<Github />} link="https://github.com/QuinPoley"/>
        <NavBarItem icon={<Caret />}>
          <DropdownMenu></DropdownMenu>
        </NavBarItem>
      </NavBar>
      <View isSel="{isSelect}"/>
    </div>
  );
}

function DropdownMenu(){
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el){
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  function DropdownItem(props){
    if(props.leftIcon){
      if(props.rightIcon){
        return(
            <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
              <span className="icon-button">{props.leftIcon}</span>
              {props.children}
              <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
      }
      else{
        return(
          <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
          </a>
      )
      }
    }
    else{
      return(
          <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            {props.children}
          </a>
      )
    }
  }
  return(
    <div className="dropdown" style={{ height: menuHeight}}>
      <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>Load New Region</DropdownItem>
          <DropdownItem>Clear View</DropdownItem>
          <DropdownItem>View Controls</DropdownItem>
          <DropdownItem leftIcon="S" goToMenu="settings" rightIcon={<Chevron/>}>GoTo Settings</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition in={activeMenu === 'settings'} unmountOnExit timeout={500} classNames="menu-secondary">
        <div className="menu">
          <DropdownItem leftIcon={<Arrow/>} goToMenu="main">GoTo Main</DropdownItem>
          <DropdownItem>Settings World</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}


function NavBarItem(props){
  const [open, setOpen] = useState(false)

  return(
    <li className="nav-item">
      <a href={props.link} className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  )
}

function NavBar(props){

  return(
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  )
}

export default App;
