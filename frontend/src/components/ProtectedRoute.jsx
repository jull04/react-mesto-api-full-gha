import React from 'react';
import { Navigate } from "react-router-dom";

// компонент принимает другой компонент в качестве пропса

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to='/sign-in' replace/>
)};

export default ProtectedRouteElement;