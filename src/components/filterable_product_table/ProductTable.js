import React from 'react';

import ProductCategoryRow from './ProductCategoryRow'
import ProductRow from './ProductRow'

// Work correctly only with sorted products by category
class ProductTable extends React.Component {
  render() {
    const rows = [];
    let currentCategory = null;

    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    // Sort products by category
    const listProducts = this.props.products.sort(function(obj1, obj2) {
      if (obj1.category < obj2.category)
        return -1;
      if (obj1.category > obj2.category)
        return 1;
      return 0;
    });


    listProducts.forEach((product) => {
      // return if have no charactor (no mater uppercase or lowercase)
      if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) { return; }

      // return if click inStockOnly and have no products in stock
      if (inStockOnly && !product.stocked) { return; }

      // Add category row
      if (product.category !== currentCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }

      // Add product detail row
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );

      if (currentCategory !== product.category) {
        currentCategory = product.category;
      }
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default ProductTable;

