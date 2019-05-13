import React from "react";
import Card from "./Card";

const ShopCards = props => {

    const renderCards = () => (
        props.products ? props.products.map(card => (
            <Card key={card._id} {...card} grid={props.grid}/>
        )) 
        : null
    )

    return (
        <div className="card_block_shop">
            <div>
                <div>
                    {props.products ?
                        props.products.length === 0 ?
                            <div className="no_result">
                                Sorry, no results
                            </div>
                        :null
                    :null}
                    { renderCards(props.products)}
                </div>

            </div>
        </div>
    );
};

export default ShopCards;
