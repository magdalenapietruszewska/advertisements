import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Ad } from "../types";
import AdForm from "./AdForm";
import { Typography } from "@material-ui/core";

const EditAd: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adToEdit, setAdToEdit] = useState<Ad | null>(null);

  useEffect(() => {
    const storedAds = localStorage.getItem("ads");
    const ads = storedAds ? JSON.parse(storedAds) : [];
    const ad = ads.find((ad: Ad) => ad.id === id);

    if (ad) {
      setAdToEdit(ad);
    } else {
      navigate("/notFound");
    }
  }, [id, navigate]);

  const handleSubmit = (ad: Ad) => {
    const storedAds = localStorage.getItem("ads");
    const ads: Ad[] = storedAds ? JSON.parse(storedAds) : [];

    const updatedAds = ads.map((storedAd: Ad) =>
      storedAd.id === ad.id ? { ...storedAd, ...ad } : storedAd
    );

    localStorage.setItem("ads", JSON.stringify(updatedAds));
    navigate("/home");
  };

  return (
    <div>
      <Typography variant="h5" align="center" className="edit-add__title h">
        Edit Ad
      </Typography>
      {adToEdit ? (
        <AdForm onSubmit={handleSubmit} adToEdit={adToEdit} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditAd;
