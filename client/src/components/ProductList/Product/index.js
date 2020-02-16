import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Thumb from "../../share/Thumb";
import { formatPrice } from "../../share/utils";
import { addProduct } from "../../../reducers/cart/actions";

const Product = ({ user, product, addProduct }) => {
  product.quantity = 1;

  let formattedPrice = formatPrice(product.price, product.currencyId);

  let productInstallment;

  if (product.installments) {
    const installmentPrice = product.price / product.installments;

    productInstallment = (
      <div className="installment">
        <span>or {product.installments} x</span>
        <b>
          {product.currencyFormat}
          {formatPrice(installmentPrice, product.currencyId)}
        </b>
      </div>
    );
  }

  return (
    <div className="shelf-item" data-sku={product.sku}>
      <Link to="details">
        {product.isFreeShipping && (
          <div className="shelf-stopper">Free shipping</div>
        )}
        <Thumb
          classes="shelf-item__thumb"
          src={product.image.url}
          alt={product.image.title}
        />
        <div className="item_infor">
          <p className="shelf-item__title">{product.name}</p>
          <p>
            <span>Prices: $</span>
            <small>{product.currencyFormat}</small>
            <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
            <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
            {productInstallment}
          </p>
          <p>Total Products: {product.quantity}</p>
        </div>
      </Link>
      {user && user.authenticated ? (
        <p className="shelf-item__buy-btn" onClick={() => addProduct(product)}>
          ADD TO CARD
        </p>
      ) : (
        <Link to="login">
          <p className="shelf-item__buy-btn">LOGIN TO BUY</p>
        </Link>
      )}
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, { addProduct })(Product);
