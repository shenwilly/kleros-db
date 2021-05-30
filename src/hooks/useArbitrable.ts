import { useContext } from "react";

import { ArbitrableContext } from "../contexts/Arbitrable";

const useArbitrable = () => {
  return { ...useContext(ArbitrableContext) };
};

export default useArbitrable;
