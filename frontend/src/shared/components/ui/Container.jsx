import React from "react";

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
);

export default Container;
