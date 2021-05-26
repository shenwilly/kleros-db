import React from "react";
import { CgSpinner } from "react-icons/cg";

const Spinner: React.FC = () => {
    // todo dynamic class name
    
  return (
    <CgSpinner className="f1 rotate-center"/>
  );
};

export default Spinner;