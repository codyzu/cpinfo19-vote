import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Container, Nav, Navbar, NavbarBrand } from "reactstrap"

const Header = ({ siteTitle, ...props }) => {
  console.log("PROPS:", props)
  return (
    <header>
      <Navbar light color="light" expand="xs">
        <Container>
          <NavbarBrand>CPINFO-19</NavbarBrand>
          <Nav navbar>
            <Link to="/" className="nav-link" activeClassName="active">
              Results
            </Link>
            <Link to="/vote" className="nav-link" activeClassName="active">
              Vote
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
