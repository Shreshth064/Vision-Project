import React from "react";
import WebAppHeader from '../components/WebAppHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';

const edgesData = [300, 122, 133, 177, 122]
const data = [
    {
        month: "Jan",
        quantity: 120,
        from: "D1"
    },
    {
        month: "Feb",
        quantity: 144,
        from: "D2"
    },
    {
        month: "Mar",
        quantity: 128,
        from: "D3"
    },
    {
        month: "Apr",
        quantity: 110,
        from: "D3"
    },
    {
        month: "May",
        quantity: 60,
        from: "D3"
    },
    {
        month: "Jun",
        quantity: 45,
        from: "D2"
    },
    {
        month: "Jul",
        quantity: 45,
        from: "D4"
    },
    {
        month: "Aug",
        quantity: 45,
        from: "D5"
    },
    {
        month: "Sep",
        quantity: 33,
        from: "D2"
    },
    {
        month: "Oct",
        quantity: 88,
        from: "D3"
    },
    {
        month: "Nov",
        quantity: 22,
        from: "D4"
    },
    {
        month: "Dec",
        quantity: 34,
        from: "D3"
    }
]

function Dashboard() {

    return (
        <>
            <WebAppHeader edges={edgesData} values={data} />
        </>
    );
};

export default Dashboard;