export interface Ad {
  id: string;
  name: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface AdFormProps {
  onSubmit: (ad: Ad) => void;
  ad?: Ad;
}

export interface SampleAdsProps {
  updateAdsState: () => void;
}
