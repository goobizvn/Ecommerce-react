import React from "react";
import { Container, Segment, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { getProducts, search } from "../actions/products";
import ProductList from "./ProductList";

export const PRODUCT_LIST = {
  length: 5,
  items: [
    {
      quantity: 1,
      name: "T-shirt",
      price: 5,
      image: {
        title: "T-shirt",
        url: "https://i.stack.imgur.com/xskB0.jpg"
      },
      isFreeShipping: true,
      id: 12,
      sku: 12064273040195392,
      description: "4 MSL",
      availableSizes: ["S", "XS"],
      style: "Black with custom print",
      price: 10.9,
      installments: 9,
      currencyId: "USD",
      currencyFormat: "$"
    },

    {
      quantity: 1,
      name: "T-shirt",
      price: 5,
      image: {
        title: "T-shirt",
        url: "https://i.stack.imgur.com/xskB0.jpg"
      },
      isFreeShipping: true,
      id: 12,
      sku: 12064273040195392,
      description: "4 MSL",
      availableSizes: ["S", "XS"],
      style: "Black with custom print",
      price: 10.9,
      installments: 9,
      currencyId: "USD",
      currencyFormat: "$"
    },
    {
      quantity: 1,
      name: "T-shirt",
      price: 5,
      image: {
        title: "T-shirt",
        url: "https://i.stack.imgur.com/xskB0.jpg"
      },
      isFreeShipping: false,
      id: 12,
      sku: 12064273040195392,
      description: "4 MSL",
      availableSizes: ["S", "XS"],
      style: "Black with custom print",
      price: 10.9,
      installments: 9,
      currencyId: "USD",
      currencyFormat: "$"
    },
    {
      quantity: 1,
      name: "T-shirt",
      price: 5,
      image: {
        title: "T-shirt",
        url: "https://i.stack.imgur.com/xskB0.jpg"
      },
      isFreeShipping: true,
      id: 12,
      sku: 12064273040195392,
      description: "4 MSL",
      availableSizes: ["S", "XS"],
      style: "Black with custom print",
      price: 10.9,
      installments: 9,
      currencyId: "USD",
      currencyFormat: "$"
    },
    {
      quantity: 1,
      name: "T-shirt",
      price: 5,
      image: {
        title: "T-shirt",
        url: "https://i.stack.imgur.com/xskB0.jpg"
      },
      isFreeShipping: false,
      id: 12,
      sku: 12064273040195392,
      description: "4 MSL",
      availableSizes: ["S", "XS"],
      style: "Black with custom print",
      price: 10.9,
      installments: 9,
      currencyId: "USD",
      currencyFormat: "$"
    }
  ]
};
class Products extends React.Component {
  state = {
    products: [],
    success: false,
    loading: true
  };

  componentDidMount() {
    this.props.dispatch(getProducts());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products && nextProps.products.success) {
      this.setState({
        products: nextProps.products.products,
        loading: false,
        success: nextProps.products.products
      });
    }
  }

  handleSearch = e => {
    const item = e.target.value;
    if (item == "") {
      this.props.dispatch(getProducts());
    } else {
      this.props.dispatch(search(item));
    }
  };

  render() {
    const { products, loading } = this.state;
    return (
      <Container>
        <Segment loading={loading}>
          <Input
            name="search"
            onChange={this.handleSearch}
            fluid
            icon="search"
            placeholder="Search..."
            style={{ marginBottom: "50px", marginTop: "30px" }}
          />
          <ProductList products={PRODUCT_LIST} />
        </Segment>
      </Container>
    );
  }
}

export default connect(({ products }) => ({ products: products.products }))(
  Products
);
