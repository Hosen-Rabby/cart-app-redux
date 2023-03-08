import React from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const allprod = useSelector((state) => state);
  console.log(allprod);

  return (
    <>
      {/* <!-- product item --> */}
      {allprod.map((p) => (
        <div className="lws-productCard">
          <img className="lws-productImage" src={p.productImgUrl} alt="product" />
          <div className="p-4 space-y-2">
            <h4 className="lws-productName">{p.productName}</h4>
            <p className="lws-productCategory">{p.productCategory}</p>
            <div className="flex items-center justify-between pb-2">
              <p className="productPrice">
                BDT <span className="lws-price">{p.productPrice}</span>
              </p>
              <p className="productQuantity">
                QTY <span className="lws-quantity">{p.productQty}</span>
              </p>
            </div>
            <button className="lws-btnAddToCart">Add To Cart</button>
          </div>

          {/* <!-- product item ends -->
      
              <!-- product item --> */}
          {/* <!-- product item ends --> */}
        </div>
      ))}
    </>
  );
};

export default Products;
