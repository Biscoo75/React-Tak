import React from "react";
import NavScrollExample from "../navBar";
import Footer from "../footer/footer";
import { Outlet } from "react-router-dom";

export default function Layout()
{
    return<>
    <NavScrollExample/>
    <Outlet></Outlet>
    <Footer/>
    </>
}