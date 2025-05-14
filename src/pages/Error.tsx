import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface ErrorProps {
  code?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorProps> = ({
  code = "404",
  message = "The page you're looking for doesn't exist or has been moved.",
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div style={{
      background: "#000",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center"
    }}>
      <h1 style={{
        fontSize: "3rem",
        marginBottom: "1rem",
        color: "#fff"
      }}>
        Error {code}
      </h1>
      <p style={{
        fontSize: "1.2rem",
        marginBottom: "2rem",
        maxWidth: "600px"
      }}>
        {message}
      </p>
      <Button onClick={handleGoHome}>Return to Home</Button>
    </div>
  );
};

export default ErrorPage;
