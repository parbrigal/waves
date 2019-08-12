import React from 'react'

const HistoryBlock = (props) => {
    const renderBlocks = () => (
        props.history ?
        props.history.map((prod,i) => (
            <tr key={i}>
                <td>
                    
                </td>
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
