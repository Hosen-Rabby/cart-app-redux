import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcPlus } from "react-icons/fc";
import { FcMinus } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import { ImCart } from "react-icons/im";
import logo from "../images/logo.svg";

import {
  addNewProduct,
  decreaseQty,
  increaseQty,
  reset,
  singleItemTotal,
  singleItemTotala,
  singleItemTotalDec,
} from "../redux/product/actions";
import { decreaseCart, increaseCart } from "../redux/cart/actions";

const ProductPage = () => {
  const allProduct = useSelector((state) => state);
  const [product, setProduct] = useState([]);

  const nextProdId = (prods) => {
    const maxId = prods.product.reduce(
      (maxId, prod) => Math.max(prod?.id, maxId),
      -1
    );
    return maxId + 1;
  };

  const prodArr = allProduct.product;

  // dispatches
  const dispatch = useDispatch();

  const addProductDis = (value) => {
    dispatch(addNewProduct(value));
  };
  const decreaseQtyDis = (value) => {
    dispatch(decreaseQty(value));
  };

  const increaseQtyDis = (value) => {
    dispatch(increaseQty(value));
  };

  const increaseCartDis = () => {
    dispatch(increaseCart());
  };

  const decreaseCartDis = (value) => {
    dispatch(decreaseCart(value));
  };

  const singleItemTotalDis = (id) => {
    dispatch(singleItemTotal(id));
  };

  const singleItemTotalDecDis = (id) => {
    dispatch(singleItemTotalDec(id));
  };

  const singleItemTotalaDis = (id) => {
    dispatch(singleItemTotala(id));
  };

  const resetDis = (id) => {
    dispatch(reset(id));
  };

  // filter only carted product
  const filteredProd = prodArr.filter((p) => p.cartCount > 0);
  let p;
  let subTotal = 0;
  for (p of filteredProd) {
    subTotal = subTotal + p.singleTotal;
  }

  // add new product
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInput = { ...product };
    newInput[field] = value;
    setProduct(newInput);
  };

  const submitProduct = (e) => {
    e.preventDefault();
    const productName = product.product_name;
    const productCategory = product.product_category;
    const productImgUrl = product.product_img_url;
    const productPrice = parseInt(product.product_price);
    const productQty = parseInt(product.product_qnt);
    const id = nextProdId(allProduct);
    let cartCount = 0;
    const singleTotal = 0;
    const allData = {
      productName,
      productCategory,
      productImgUrl,
      productPrice,
      productQty,
      id,
      singleTotal,
      cartCount,
    };
    document.getElementById("lws-addProductForm").reset();
    addProductDis(allData);
  };

  // swipping
  const swipToCart = () => {
    document.getElementById("cartSection").style.display = "block";
    document.getElementById("formSection").style.display = "none";
  };
  const swipToForm = () => {
    document.getElementById("cartSection").style.display = "none";
    document.getElementById("formSection").style.display = "block";
  };

  // handle functions

  const handleAddToCart = (id) => {
    increaseCartDis();
    decreaseQtyDis(id);
    singleItemTotalDis(id);
    singleItemTotalaDis(id);
  };

  const handlePlus = (id) => {
    decreaseQtyDis(id);
    increaseCartDis();
    singleItemTotalDis(id);
    singleItemTotalaDis(id);
  };

  const handleMinus = (id) => {
    decreaseCartDis(1);
    increaseQtyDis(id);
    singleItemTotalDecDis(id);
    singleItemTotalaDis(id);
  };

  const handleDelete = (id, count) => {
    resetDis(id);
    decreaseCartDis(count);
  };

  return (
    <div>
      <nav class="bg-[#171C2A] py-4">
        <div class="navBar">
          <a href="index.html" className="logo">
            {/* <img src={logo} alt="LWS" class="max-w-[140px]" /> */}
            Logo
          </a>

          <div class="flex gap-4">
            <a class="navHome" id="lws-home" onClick={swipToForm}>
              {" "}
              Home{" "}
            </a>
            <a class="navCart" id="lws-cart" onClick={swipToCart}>
              <i class="text-xl fa-sharp fa-solid fa-bag-shopping"></i>
              <ImCart />
              <span id="lws-totalCart">{allProduct.cart.totalCart}</span>
            </a>
          </div>
        </div>
      </nav>

      <main class="py-16" id="cartSection">
        <div class="container 2xl:px-8 px-2 mx-auto">
          <h2 class="mb-8 text-xl font-bold">Shopping Cart</h2>
          <div class="cartListContainer">
            <div class="space-y-6">
              {/* <!-- Cart Item --> */}

              {filteredProd.length === 0 ? (
                <h2>Your cart is empty!</h2>
              ) : (
                <>
                  {filteredProd.map((p) => (
                    <div class="cartCard">
                      <div class="flex items-center col-span-6 space-x-6">
                        {/* <!-- cart image --> */}
                        <img
                          class="lws-cartImage"
                          src={p.productImgUrl}
                          alt="product"
                        />
                        {/* <!-- cart item info --> */}
                        <div class="space-y-2">
                          <h4 class="lws-cartName">{p.productName}</h4>
                          <p class="lws-cartCategory">{p.productCategory}</p>
                          <p>
                            BDT{" "}
                            <span class="lws-cartPrice">{p.productPrice}</span>
                          </p>
                        </div>
                      </div>
                      <div class="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
                        {/* <!-- amount buttons --> */}
                        <div class="flex items-center space-x-4">
                          {p.productQty === 0 ? (
                            <button class="lws-incrementQuantity" disabled>
                              <FcPlus />
                            </button>
                          ) : (
                            <button
                              class="lws-incrementQuantity"
                              onClick={() => {
                                handlePlus(p.id);
                              }}
                            >
                              <FcPlus />
                            </button>
                          )}
                          <span class="lws-cartQuantity">{p.cartCount}</span>
                          {p.cartCount === 1 ? (
                            <button class="lws-decrementQuantity" disabled>
                              <FcMinus />
                            </button>
                          ) : (
                            <button
                              class="lws-decrementQuantity"
                              onClick={() => {
                                handleMinus(p.id);
                              }}
                            >
                              <FcMinus />
                            </button>
                          )}
                        </div>
                        {/* <!-- price --> */}
                        <p class="text-lg font-bold">
                          BDT{" "}
                          <span class="lws-calculatedPrice">
                            {p.singleTotal}
                          </span>
                        </p>
                      </div>
                      {/* <!-- delete button --> */}
                      <div class="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
                        <button
                          class="lws-removeFromCart"
                          onClick={() => {
                            handleDelete(p.id, p.cartCount);
                          }}
                        >
                          <FcFullTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* <!-- Bill Details --> */}
            <div>
              <div class="billDetailsCard">
                <h4 class="mt-2 mb-8 text-xl font-bold text-center">
                  Bill Details
                </h4>
                <div class="space-y-4">
                  {/* <!-- sub total --> */}
                  <div class="flex items-center justify-between">
                    <p>Sub Total</p>
                    <p>
                      BDT <span class="lws-subtotal">{subTotal}</span>
                    </p>
                  </div>
                  {/* <!-- Discount --> */}
                  <div class="flex items-center justify-between">
                    <p>Discount</p>
                    <p>
                      BDT <span class="lws-discount">0</span>
                    </p>
                  </div>
                  {/* <!-- VAT --> */}
                  <div class="flex items-center justify-between">
                    <p>VAT</p>
                    <p>
                      BDT <span class="vat">0</span>
                    </p>
                  </div>
                  {/* <!-- Total --> */}
                  <div class="flex items-center justify-between pb-4">
                    <p class="font-bold">TOTAL</p>
                    <p class="font-bold">
                      BDT <span class="lws-total">{subTotal}</span>
                    </p>
                  </div>
                  <button class="placeOrderbtn">place order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <main class="py-16" id="formSection">
        <div class="productWrapper">
          {/* <!-- products container --> */}
          <div class="productContainer" id="lws-productContainer">
            {/* <!-- product item --> */}
            {allProduct.product.map((p) => (
              <div className="lws-productCard">
                <img
                  className="lws-productImage"
                  src={p.productImgUrl}
                  alt="product"
                />
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
                  {p.productQty === 0 ? (
                    <button className="lws-btnAddToCart" disabled>
                      Add To Cart
                    </button>
                  ) : (
                    <button
                      className="lws-btnAddToCart"
                      onClick={() => {
                        handleAddToCart(p.id);
                      }}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>

                {/* <!-- product item ends -->
      
              <!-- product item --> */}
                {/* <!-- product item ends --> */}
              </div>
            ))}
            {/* <!-- product item ends --> */}
          </div>
          {/* <!-- products container ends --> */}

          {/* <!-- Product Input Form --> */}
          <div className="formContainer">
            <h4 className="formTitle">Add New Product</h4>
            <form
              className="space-y-4 text-[#534F4F]"
              id="lws-addProductForm"
              onSubmit={submitProduct}
            >
              {/* <!-- product name --> */}
              <div className="space-y-2">
                <label for="lws-inputName">Product Name</label>
                <input
                  className="addProductInput"
                  id="lws-inputName"
                  type="text"
                  name="product_name"
                  required
                  onChange={handleOnChange}
                />
              </div>
              {/* <!-- product category --> */}
              <div className="space-y-2">
                <label for="lws-inputCategory">Category</label>
                <input
                  className="addProductInput"
                  name="product_category"
                  id="lws-inputCategory"
                  type="text"
                  required
                  onChange={handleOnChange}
                />
              </div>
              {/* <!-- product image url --> */}
              <div className="space-y-2">
                <label for="lws-inputImage">Image Url</label>
                <input
                  className="addProductInput"
                  id="lws-inputImage"
                  name="product_img_url"
                  type="text"
                  required
                  onChange={handleOnChange}
                />
              </div>
              {/* <!-- price & quantity container --> */}
              <div className="grid grid-cols-2 gap-8 pb-4">
                {/* <!-- price --> */}
                <div className="space-y-2">
                  <label for="ws-inputPrice">Price</label>
                  <input
                    className="addProductInput"
                    name="product_price"
                    type="number"
                    id="lws-inputPrice"
                    min="1"
                    required
                    onChange={handleOnChange}
                  />
                </div>
                {/* <!-- quantity --> */}
                <div className="space-y-2">
                  <label for="lws-inputQuantity">Quantity</label>
                  <input
                    className="addProductInput"
                    type="number"
                    name="product_qnt"
                    id="lws-inputQuantity"
                    min="1"
                    required
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              {/* <!-- submit button --> */}
              <button type="submit" id="lws-inputSubmit" className="submit">
                Add Product
              </button>
            </form>
          </div>
          {/* <!-- Product Input Form Ends --> */}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
