import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ad, AdFormProps } from "../types";
import { Button, TextField } from "@material-ui/core";

const AdForm: React.FC<AdFormProps> = ({ onSubmit, adToEdit, ads = [] }) => {
  const navigate = useNavigate();
  const [newAd, setNewAd] = useState<Ad>({
    id: "",
    name: "",
    content: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (adToEdit) {
      setNewAd(adToEdit);
    }
  }, [adToEdit]);

  const generateId = () => {
    return `${Date.now()}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAd.name || !newAd.content || !newAd.startDate || !newAd.endDate) {
      alert("Please fill in all fields!");
      return;
    }

    const startDate = new Date(newAd.startDate);
    const endDate = new Date(newAd.endDate);

    if (endDate < startDate) {
      alert("End date cannot be earlier than start date!");
      return;
    }

    const adExists = ads.some(
      (ad: Ad) => ad.name === newAd.name && ad.id !== newAd.id
    );

    if (adExists) {
      alert(`Ad with the name "${newAd.name}" already exists!`);
      return;
    }

    if (adToEdit) {
      onSubmit(newAd);
    } else {
      onSubmit({ ...newAd, id: generateId() });
    }

    setNewAd({
      id: "",
      name: "",
      content: "",
      startDate: "",
      endDate: "",
    });

    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="ad-form">
      <div className="ad-form__field">
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          id="name"
          placeholder="Enter ad name"
          value={newAd.name}
          onChange={handleChange}
          required
          fullWidth
          className="ad-form__input"
        />
      </div>

      <div className="ad-form__field">
        <TextField
          label="Content"
          variant="outlined"
          name="content"
          id="content"
          placeholder="Enter ad content"
          value={newAd.content}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
          className="ad-form__input"
        />
      </div>

      <div className="ad-form__field">
        <TextField
          label="Start campaign date"
          variant="outlined"
          type="date"
          name="startDate"
          id="startDate"
          value={newAd.startDate}
          onChange={handleChange}
          required
          fullWidth
          className="ad-form__input"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: new Date().toISOString().split("T")[0],
          }}
        />
      </div>

      <div className="ad-form__field">
        <TextField
          label="End campaign date"
          variant="outlined"
          type="date"
          name="endDate"
          id="endDate"
          value={newAd.endDate}
          onChange={handleChange}
          required
          fullWidth
          className="ad-form__input"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: new Date().toISOString().split("T")[0],
          }}
        />
      </div>

      <div className="ad-form__submit">
        <Button type="submit" color="primary" variant="outlined" fullWidth>
          {adToEdit ? "Save Changes" : "Add Ad"}
        </Button>
      </div>
    </form>
  );
};

export default AdForm;
