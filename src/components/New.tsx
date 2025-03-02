import React from "react";
import AdForm from "./AdForm";
import { Ad } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";
import { Typography } from "@material-ui/core";

const New: React.FC = () => {
  const [ads, setAds] = useLocalStorage<Ad[]>("ads", []);

  const handleAdSubmit = (newAd: Ad) => {
    const adExists = ads.some((ad) => ad.name === newAd.name);

    if (adExists) {
      alert(`Ad with the name "${newAd.name}" already exists!`);
      return;
    }

    const updatedAds = [...ads, newAd];
    setAds(updatedAds);
  };

  return (
    <div>
      <Typography variant="h5" align="center" className="edit-add__title h">
        Create a new Ad
      </Typography>
      <AdForm onSubmit={handleAdSubmit} />
    </div>
  );
};

export default New;
