'use client';
import React, { useState } from 'react';
type ShoppingItem = {
  name: string;
  quantity: number;
  purchased: boolean;
};
const ShoppingList = ({ initialItems }: { initialItems: ShoppingItem[] }) => {
  return (
    <table cellPadding="8" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Purchased</th>
        </tr>
      </thead>
      <tbody>
        {initialItems.map((item, idx) => (
          <tr key={idx}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Example usage:
// const App = () => {
//   const shoppingItems = [
//     { name: "Apples", quantity: 5, purchased: false },
//     { name: "Bread", quantity: 2, purchased: true },
//     { name: "Milk", quantity: 1, purchased: false },
//   ];

//   return <ShoppingList initialItems={shoppingItems} />;
// };

export default ShoppingList;
