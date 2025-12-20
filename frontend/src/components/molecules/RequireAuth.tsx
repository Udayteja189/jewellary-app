import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { UserState } from '../../types/User';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useSelector((state: { auth: UserState }) => state.auth);
  const location = useLocation();
  console.log("Auth state in RequireAuth:", auth);
  if (!auth?.email) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}