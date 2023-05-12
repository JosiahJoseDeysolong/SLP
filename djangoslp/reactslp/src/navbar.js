import React from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
    background: #333;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
`;

const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        color: #15cdfc;
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const UpperNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50%;
`;

const LowerNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    height: 50%;
`;

const SearchBar = styled.input`
  height: 50%;
  padding: 0.5rem;
  width: 50%;
  border: none;
  border-radius: 15px;
  margin-right: 1rem;
`;

const Navbar = () => {
  return (
    <Nav>
        <UpperNav>
            <NavLink to='/'>
                <h1>(Logo)</h1>
            </NavLink>
            <SearchBar type='text' placeholder='Search...' />
            <NavLink to="/login">
                login
            </NavLink>
        </UpperNav>
        <LowerNav>
            <NavMenu>

                <NavLink to="/">
                    HOME
                </NavLink>

                <NavLink to="/projects">
                    PROJECTS
                </NavLink>

                <NavLink to="/articles">
                    ARTICLES
                </NavLink>

                <NavLink to="/brochures">
                    BROCHURES
                </NavLink>

                <NavLink to="/gallery">
                    GALLERY
                </NavLink>
            </NavMenu>
        </LowerNav>
    </Nav>
  );
};

export default Navbar;
