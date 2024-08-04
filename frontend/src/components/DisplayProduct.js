import React, { useEffect } from 'react';

const DisplayProduct = ({ data }) => {
  useEffect(() => {
    console.log(Array.isArray(data), data);
  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((product) => (
          <li
            key={product.productId}
            className="py-4 flex items-center justify-between bg-slate-200 p-2"
          >
            <div>
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-gray-600">
                ${product.price.toFixed(2)} - {product.company}
              </p>
              <p className="text-red-500">
                Rating: {parseFloat(product.rating.$numberDecimal).toFixed(1)}
              </p>
            </div>
            <div>
              {product.featured && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  Featured
                </span>
              )}
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};


export default DisplayProduct;
