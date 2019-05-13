import React from "react";
import ShopCards from "./ShopCards";

const ShopDisplay = props => {
  return (
    <div>
      <div>
        <ShopCards grid={props.grid} products={props.products} />
      </div>

      {props.size > 0 && props.size >= props.limit ? (
        <div className="load_more_container">
          <span onClick={() => props.loadMore()}>Load More</span>
        </div>
      ) : null}
    </div>
  );
};

export default ShopDisplay;
