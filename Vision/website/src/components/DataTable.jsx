import Table from 'react-bootstrap/Table';
import React from 'react';

function DataTable(props) {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Quantity</th>
                    <th>Ordered From</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((obj) => {
                        return (
                            <tr>
                                <td>{obj.month}</td>
                                <td>{obj.quantity}</td>
                                <td>{obj.from}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>
    );
}

export default DataTable;