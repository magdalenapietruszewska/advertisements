import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, CircularProgress } from "@material-ui/core";

const Start: React.FC<{ checkPassword: (password: string) => void }> = ({
  checkPassword,
}) => {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API: string = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuote(data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching quote.");
        setIsLoading(false);
        console.error("Fetch error:", error);
      });
  }, []);

  const handleClick = () => {
    const password = prompt("Please enter the password:");

    checkPassword(password);

    if (password === process.env.REACT_APP_PASSWORD) {
      navigate("/home");
    } else {
      navigate("/notFound");
    }
  };

  return (
    <div className="quote-container">
      {isLoading ? (
        <div className="quote-container__loader">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div className="quote-container__content">
          <Typography variant="h5" className="quote-container__quote">
            "{quote?.quote}"
          </Typography>
          <Typography variant="subtitle1" className="quote-container__author">
            - {quote?.author}
          </Typography>
        </div>
      )}
      <Button color="primary" onClick={handleClick}>
        Go to Ads management panel
      </Button>
    </div>
  );
};

export default Start;
