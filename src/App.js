import './App.css';
import React, { useState } from 'react';
import {CSSTransition} from 'react-transition-group';
import View from './View.js'

function App() {
  return (
    <div className="App">
      <NavBar>
        <NavBarItem icon="H"/>
        <NavBarItem icon="I"/>
        <NavBarItem icon="J"/>
        <NavBarItem icon="V">
          <DropdownMenu></DropdownMenu>
        </NavBarItem>
      </NavBar>
      <View name="hi"/>
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
    return(
    <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
      <span className="icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-right">{props.rightIcon}</span>

    </a>
    )
  }
  return(
    <div className="dropdown" style={{ height: menuHeight}}>
      <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>Hello World</DropdownItem>
          <DropdownItem leftIcon="S" goToMenu="settings">GoTo Settings</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition in={activeMenu === 'settings'} unmountOnExit timeout={500} classNames="menu-secondary">
        <div className="menu">
          <DropdownItem>Settings World</DropdownItem>
          <DropdownItem leftIcon="M" goToMenu="main">GoTo Main</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}


function NavBarItem(props){
  const [open, setOpen] = useState(false)

  return(
    <li className="nav-item">
      <a href='#' className="icon-button" onClick={() => setOpen(!open)}>
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
