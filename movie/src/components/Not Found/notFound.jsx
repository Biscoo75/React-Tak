import React from "react";
import { Container } from "react-bootstrap";
export default function NotFound() {
    return <div class=" container d-flex w-100 h-100  mx-auto flex-column text-center py-4">


        <main class="px-3 my-5">
            <h1>Not Found</h1>
            <p class="lead">This page doesn’t exist.
                If this is a mistake, let us know, and we will try to fix it!
            </p>
            <p class="lead">
                <a href="#" class="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</a>
            </p>
        </main>


    </div>
}