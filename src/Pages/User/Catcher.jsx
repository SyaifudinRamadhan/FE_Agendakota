import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Catcher = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/404");
  });

  return <div className="content"></div>;
};

export default Catcher;
