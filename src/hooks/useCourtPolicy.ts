import { useContext } from "react";

import { CourtPolicyContext } from "../contexts/CourtPolicy";

const useCourts = () => {
  return { ...useContext(CourtPolicyContext) };
};

export default useCourts;
