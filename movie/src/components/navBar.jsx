import 'bootstrap/dist/css/bootstrap.css';
// import './App.css';
import React, { useState } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function NavScrollExample({filterSearh}) {
    const [searchValue, setSearchValue] = useState('')
    const onSearch = () => {
        filterSearh(searchValue)
        setSearchValue('')
    }
    return (
        <Navbar expand="lg" className="bg-dark rtl" variant='dark'>
            <Container >
                <Navbar.Brand href="#"> Filtered Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link className='text-light mx-4' to={'/'}>Products</Link>
                        <Link className='text-light me-4' to={'Users'}>Users</Link>
                        {/* <Link className='text-light me-4' to={'productDetails'}>product Details</Link> */}
                        <Link className='text-light' to={'Gfd'}>not</Link>
                   

                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search "
                            className="me-2"
                            aria-label="Search"
                            onChange={(e)=> setSearchValue(e.target.value)}
                            value={searchValue}
                        />
                        <Button onClick={() => onSearch()} variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;