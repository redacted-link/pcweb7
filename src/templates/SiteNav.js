import {Nav,Navbar, Container} from "react-bootstrap";
import {signOut} from "firebase/auth";
import {auth} from "../firebase"

function SiteNav() {
    return (
        <Navbar variant="light" bg="light">
            <Container>
                <Navbar.Brand href="/">Nummaster</Navbar.Brand>
                <Nav>
                <Nav.Link href="/stats">Stats</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link onClick= {(e)=> signOut(auth)}>🚪</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
)}

export default SiteNav