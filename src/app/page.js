import React from "react";
import "../assets/css/style.css";
import Header from "@/components/common/Header";
import Products from "@/components/Products";
export default function Home() {
  return (
    <>
      <div>

        <Header />
        <Products /> 
      </div>
    </>
  );
}
