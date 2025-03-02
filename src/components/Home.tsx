import React from "react";
import { Link } from "react-router-dom";
import { Ad } from "../types";
import AdForm from "./AdForm";
import SampleAds from "./SampleAds";
import useLocalStorage from "../hooks/useLocalStorage";
import { Typography, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";

const Home: React.FC = () => {
  const [ads, setAds] = useLocalStorage<Ad[]>("ads", []);

  const handleAdSubmit = (newAd: Ad) => {
    const updatedAds = [...ads, newAd];
    setAds(updatedAds);
  };

  const handleDeleteAd = (id: string) => {
    const updatedAds = ads.filter((ad) => ad.id !== id);
    setAds(updatedAds);
  };

  const updateAdsState = () => {
    const storedAds = localStorage.getItem("ads");
    const ads = storedAds ? JSON.parse(storedAds) : [];
    setAds(ads);
  };

  return (
    <div className="ads-list">
      <div className="ads-list__left">
        <Typography variant="h5" align="center" className="ads-list__title h">
          Ads List
        </Typography>
        {ads.length > 0 ? (
          ads.map((ad) => (
            <div key={ad.id} className="ads-list__item">
              <Typography variant="h6" className="ads-list__item-title">
                {ad.name}
              </Typography>
              <Typography variant="body1" className="ads-list__item-content">
                {ad.content}
              </Typography>
              <Typography variant="body2" className="ads-list__item-dates">
                <span>Campaign start date: {ad.startDate}</span>
                <span>Campaign end date: {ad.endDate}</span>
              </Typography>
              <div className="ads-list__item-actions">
                <Link to={`/edit/${ad.id}`} className="ads-list__link">
                  <Button color="primary" variant="outlined">
                    Edit
                  </Button>
                </Link>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => handleDeleteAd(ad.id)}
                >
                  Delete Ad
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="body1">No ads have been added yet</Typography>
        )}
      </div>

      <div className="ads-list__right">
        <Typography variant="h5" className="ads-list__title h">
          Add Ad
        </Typography>
        <AdForm onSubmit={handleAdSubmit} />
        <div className="ads-list__buttons">
          <SampleAds updateAdsState={updateAdsState} />
          <Link to="/new" className="ads-list__link">
            <Button color="primary" variant="outlined" startIcon={<Add />}>
              Add New Ad
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
