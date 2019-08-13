import React from 'react';
import moment from 'moment';

const HistoryBlock = (props) => {
    const renderBlocks = () => (
        props.history ?
        props.history.map((prod,i) => (
            <tr key={i}>
                <td>
                   { moment(prod.dateOfPurchase).format("YYYY-MM-DD")}                
                </td>
                <td>{prod.brand} {prod.name}</td>
                <td>$ {prod.price}</td>
                <td>$ {prod.quantity}</td>
            </tr>
        ))
        : null
    )
    
    return (
        <div className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <th>Date of Purchase</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        renderBlocks()
                    }
                </tbody>
            </table>
        </div>
    )
}

export default HistoryBlock
