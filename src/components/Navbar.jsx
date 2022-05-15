import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function App() {
  // Collapse isOpen State
  const [isOpen, setIsOpen] = React.useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="ian navbar navbar-light bg-light"
      style={{
        display: "block",
        width: "100%",
      }}
    >
      <Navbar color="light" light expand="md">
        <Link to="/" className="navbar-brand">
          <div className="form-title">
            <div className="icon"></div>
            <div className="text">Admin</div>
          </div>
        </Link>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="row mr-auto" navbar>
            <div className="col-8"></div>
            <div className="form-admin col-4">
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  airlines
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    add airlines
                  </DropdownItem>
                  <DropdownItem>list airlines</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar style={{ marginLeft: "40px" }}>
                <DropdownToggle nav caret>
                  product
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    add product
                  </DropdownItem>
                  <DropdownItem>list product</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Nav>
          <div className="form-user">
              <button type="button" onClick={()=>{logout()}} style={{border: 'none',backgroundColor:'white'}}>Logout</button>
            </div>
        </Collapse>
      </Navbar>
    </nav>
  );
}

export default App;
