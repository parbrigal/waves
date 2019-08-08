import React from 'react'
import OurButton from '../elements/OurButton'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

const ProdNFO = (props) => {


    const showProdTags = (detail) => 
    (
        <div className="product_tags">
            {
                detail.shipping ? 
                <div className="tag">
                    <div><FontAwesomeIcon icon={faTruck}/></div>
                    <div className="tag_text">
                        <div>Free Shipping</div>
                        <div>And Return</div>
                    </div>
                </div>
                : null
            }
            {
                 detail.available ? 
                 <div className="tag">
                     <div><FontAwesomeIcon icon={faTimes}/></div>
                     <div className="tag_text">
                         <div>Not Available</div>
                         <div>Preorder Only</div>
                     </div>
                 </div>
                 : null
            }
        </div> 
    )
    const showProdActions = (detail) => (
        <div className="product_actions">
            <div className="price">$ {detail.price}</div>
            <div className="cart">
                <OurButton type="add_to_cart_link" runAction={()=> {
                   props.addToCart(detail._id)
                }}/>    
            </div>

        </div>
    )
    const showProdSpecifications = (detail) => (
        <div className="product_specifications">
            <h2>Specs</h2>
            <div>
                <div className="item">
                    <strong>Frets : </strong> {detail.frets}
                </div>
                <div className="item">
                    <strong>Wood : </strong> {detail.wood ? detail.wood.name : 'Unknown'}
                </div>
            </div>
        </div>
    )

    const detail = props.detail;
    return (
        
        <div>
            <h1>{detail.brand.name} {detail.name}</h1>
            <p>
                {detail.description}
            </p>
            {showProdTags(detail)}
            {showProdActions(detail)}
            {showProdSpecifications(detail)}
        </div>
    )
}

export default ProdNFO
