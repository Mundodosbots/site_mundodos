import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/config';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const token = localStorage.getItem('adminToken');
  
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        return;
      }

      try {
        const API_BASE = API_BASE_URL;
        const response = await fetch(`${API_BASE}/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setIsValid(true);
        } else {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setIsValid(false);
        }
      } catch (error) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);
  
  if (isValidating) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: 'var(--text-secondary)'
      }}>
        Verificando autenticação...
      </div>
    );
  }
  
  if (!token || !isValid) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
