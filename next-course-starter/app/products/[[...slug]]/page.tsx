import React from "react";

interface IProductPageProps {
  params: {
    slug: string[];
  };
}

const ProductPage = ({ params: { slug } }: IProductPageProps) => {
  return <div>ProductPage {slug}</div>;
};

export default ProductPage;
