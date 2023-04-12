import React from "react";
import {Container, Navbar} from "react-bootstrap";
import {useThemeContext} from "../hooks/useThemeContext";
import ThemeSwitch from "./ThemeSwitch";

export const Header = () => {
  const {darkMode} = useThemeContext();
  const theme = darkMode ? 'dark' : 'light';

  return (
    <Navbar bg={theme} variant={theme}>
      <Container>
        <Navbar.Brand href="#home">
          GitLab Projects List
        </Navbar.Brand>
        <ThemeSwitch />
      </Container>
    </Navbar>
  );
}
