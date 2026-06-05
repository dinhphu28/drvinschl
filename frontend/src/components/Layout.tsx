import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar color="dark" dark expand="md" className="mb-4">
        <NavbarBrand href="/">{title}</NavbarBrand>
        <Nav className="ms-auto" navbar>
          {user && (
            <NavItem>
              <NavLink className="text-light">
                {user.firstName} ({user.role})
              </NavLink>
            </NavItem>
          )}
          <NavItem>
            <Button color="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </NavItem>
        </Nav>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
