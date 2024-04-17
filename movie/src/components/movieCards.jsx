import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import './cards.css';
import Pagin from './pagination';
import { Link } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';

const Cards = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItemId, setSelectedItemId] = useState(null); // State to hold the selected card ID
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = () => {
        fetch('https://fakestoreapi.com/products', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Clear form fields after successful submission
            setFormData({
                title: '',
                price: '',
                description: '',
                image: ''
            });
            // Update local storage with new product data
            const products = JSON.parse(localStorage.getItem('items')) || [];
            // Generate a unique ID for the new product
            const newProductId = Math.floor(Math.random() * 1000000);
            const newProduct = { ...data, id: newProductId };
            const updatedProducts = [...products, newProduct];
            localStorage.setItem('items', JSON.stringify(updatedProducts));
            // Update the items state to include the newly added product
            setItems([...items, newProduct]);
            console.log('Success:', data);

        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    

    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
            setLoading(false);
        } else {
            axios.get('https://fakestoreapi.com/products')
                .then(res => {
                    setItems(res.data);
                    setLoading(false);
                    localStorage.setItem('items', JSON.stringify(res.data));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }
    }, []);


    const handleDelete = (id) => {
        // Filter out the item with the given id
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    };



    const handleEdit = (id, title) => {
        setSelectedItemId(id); // Set the selected card ID
        setEditedTitle(title); // Set the title of the item being edited
    };

    const handleSaveEdit = () => {
        // Find the selected item and update its title
        const selectedItem = items.find(item => item.id === selectedItemId);
        if (selectedItem) {
            // Make sure editedTitle is not empty before updating
            if (editedTitle.trim() !== "") {
                const updatedItems = items.map(item => {
                    if (item.id === selectedItemId) {
                        return { ...item, title: editedTitle };
                    }
                    return item;
                });
                setItems(updatedItems);
                localStorage.setItem('items', JSON.stringify(updatedItems));

            }
            setSelectedItemId(null); // Reset selected card ID

        }
    };


    const [editedTitle, setEditedTitle] = useState(""); // State to hold edited title

    return (
        <>

            {loading === true ?
                <div className='container mx-auto d-flex flex-column align-items-center '>
                    <h1 className='container text-center mx-auto text-danger'>Loading....</h1>
                    <div className="spinner-border text-danger my-4" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
                :
                <div className='mb-5 pb-5 container-xxl'>
                    <Fade>
                        <div className="">
                            <div className="addProduct mt-4 d-flex w-100 align-items-center gap-3 mb-5">

                                <div>
                                    <h1 className='usersHeader '>Products</h1>
                                </div>
                                <div className=''>
                                    <Button variant="primary bg-primary" onClick={handleShow}>
                                        Add Product
                                    </Button>

                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add Product</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <InputGroup className="mb-3 d-flex flex-column w-100">
                                                <label htmlFor="Add">Name</label>
                                                <Form.Control
                                                    className='w-100 my-2'
                                                    id='Add'
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    placeholder='Product Name'
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                />

                                                <label htmlFor="Price">Price</label>
                                                <Form.Control
                                                    className='w-100 my-2'
                                                    id='Price'
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    placeholder='Product Price'
                                                    type='number'
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                />

                                                <label htmlFor="Desc">Description</label>
                                                <Form.Control
                                                    className='w-100 my-2'
                                                    id='Desc'
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    placeholder='Product Description'
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                />

                                                <label htmlFor="Image">Product Image</label>
                                                <Form.Control
                                                    className='w-100 my-2'
                                                    id='Image'
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    placeholder='Product Image URL'
                                                    type='text'
                                                    name="image"
                                                    // onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                                    value={formData.image}
                                                    onChange={handleInputChange}
                                                />
                                            </InputGroup>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary btn-outline-danger" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary bg-primary" onClick={handleSubmit}>Add</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>

                            </div>
                        </div>
                        <Row xs={1} md={3} lg={4} className="g-4 mb-5 container-xxl mx-auto">
                            {items.map((item) => (
                                <Col key={item.id}>
                                    <Card className='card' id="cardId">
                                        <Link to={`/product/${item.id}`} className="card-link">
                                            <Card.Img variant="top" src={item.image} className='cardImage' />
                                        </Link>
                                        <Card.Body className='position-rela'>

                                            {selectedItemId === item.id ? (

                                                <InputGroup className="mb-3 d-flex flex-column w-100" onChange={(e) => setEditedTitle(e.target.value)}>

                                                    <h1>Edit</h1>
                                                    <Form.Control
                                                        className='w-100 '
                                                        value={editedTitle}
                                                        onChange={(e) => setEditedTitle(e.target.value)}
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default"
                                                    />
                                                </InputGroup>

                                            ) : (
                                                <Card.Title className='cardTitle'>{item.title}</Card.Title>
                                            )}
                                            {/* <Card.Title className='cardTitle'>{item.title} <br /> </Card.Title> */}
                                            <h1 className='price'>${item.price}</h1>
                                            <Card.Text className='cardDesc'>{item.description}</Card.Text>
                                            <Card.Text className='position-absolute bottom-0 d-flex align-items-center gap-3'>
                                                <Button variant="danger text-danger mb-2" onClick={() => handleDelete(item.id)}>Delete</Button>
                                                {selectedItemId === item.id ? (
                                                    <Button variant="success bg-success  mb-2" onClick={handleSaveEdit}>Save</Button>
                                                ) : (
                                                    <Button variant="primary bg-primary mb-2" onClick={() => handleEdit(item.id, item.title)}>Edit</Button>
                                                )}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>

                                </Col>
                            ))}
                        </Row>
                        <Pagin />
                    </Fade>
                </div>
            }
        </>
    );
}

export default Cards;
