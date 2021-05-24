import { useContext } from "react";

import { CourtsContext } from "../contexts/Courts";

const useCourts = () => {
  return { ...useContext(CourtsContext) };
};

export default useCourts;
