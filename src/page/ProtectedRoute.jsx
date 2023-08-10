import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
  // 로그인한 사용자 여부 확인
  // 그 사용자가 어드민 권한 여부 확인
  // requireAdmin = true : 로그인 && 어드민 권한
  // 조건 x : 상위 경로로 이동
  // 조건 o : 전달된 children 보여줌
}
