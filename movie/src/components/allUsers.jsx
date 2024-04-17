import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Container } from 'react-bootstrap';
import axios from 'axios';
import { Fade } from 'react-reveal';
// import Web from './web/web';
import { Link, Outlet } from 'react-router-dom';

function AllUsers() {
    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(true);

    async function getData() {
        setLoading(true);
        axios.get('https://fakestoreapi.com/users')
            .then(response => {
                console.log(response.data);
                setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }
    useEffect(() => {
        getData();
    }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

    return (
        <>

            {loading === true ?
                <div className='container mx-auto d-flex flex-column align-items-center '>
                    <h1 className='container text-center mx-auto text-danger'>Loading....</h1>
                    <div class="spinner-border text-danger my-4" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
                : <Fade>

                    <Container className='mt-4'>
                            <h1 className='usersHeader mb-2'>All Users</h1>
                        <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {/* <thead className='usersHeader'>All Users</thead> */}
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id }</td>
                                        <td>{item.name.firstname }</td>
                                        <td>{item.name.lastname}</td>
                                        <td>{ item.username}</td>
                                    </tr>
                                    
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </Fade >}
            <Outlet></Outlet>
        </>
    );
}

export default AllUsers;
