import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button, Container, Form, Nav, Navbar, NavDropdown, Row, Col, Pagination } from 'react-bootstrap';
import axios from 'axios';
import ReactPaginate from "react-paginate";

class Pagin extends Component {

    render() {
        const  handlePageClick =(data)=>
        {
            console.log(data.selected +1);
        }
    const pageCount =50;

        return (

            <ReactPaginate 
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            containerClassName={"pagination d-flex justify-content-center  p-3"}
            renderOnZeroPageCount={null}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-link"}
            nextClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName="page-link"
            activeClassName="active"
          />
        )
    }

}
export default Pagin;