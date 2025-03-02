import React from "react";
import { SampleAdsProps, Ad } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";
import sampleAdsData from "../database/data.json";
import { Button } from "@material-ui/core";
import { Star } from "@material-ui/icons";

const SampleAds: React.FC<SampleAdsProps> = ({ updateAdsState }) => {
  const [ads, setAds] = useLocalStorage<Ad[]>("ads", []);

  const sampleAds = () => {
    localStorage.clear();
    setAds(sampleAdsData);
    updateAdsState();
  };

  return (
    <Button
      color="primary"
      variant="outlined"
      onClick={sampleAds}
      startIcon={<Star />}
    >
      Show sample ads
    </Button>
  );
};

export default SampleAds;
