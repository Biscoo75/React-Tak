import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cards.css';

const ProductsDetails = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const productId = window.location.pathname.split('/').pop(); // Get image ID from URL
        axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
                console.log('yes');
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                setLoading(false);
                console.log('no');
            });
    }, []);

    return (
        <div className='pb-5'>
            {loading ? (
                <div>Loading...</div>
            ) : product ? (
                <div className='container-xxl mx-auto mt-4'>
                    <div className='productDetailsImageCT container'>
                        <img src={product.image} alt={product.title} className='productDetailsImage' />
                    </div>
                    <h1 className='container mx-auto text-center my-5'>{product.title}</h1>
                    <h1 className='container mx-auto text-center my-5 price'>${product.price}</h1>
                    <p className='container mx-auto text-start my-5'>{product.description}</p>
                </div>
            ) : (
                <div>Product not found</div>
            )}
        </div>

    );
}

export default ProductsDetails;
