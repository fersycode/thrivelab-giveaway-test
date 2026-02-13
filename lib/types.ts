export interface FormData {
  // Step 1
  firstName: string;
  lastName: string;
  instagramHandle: string;
  email: string;
  phone: string;

  // Step 2
  painArea: "knee" | "shoulder" | "back" | "other" | "";
  painAreaOther: string;

  // Step 3
  whyNotYet: string[];

  // Step 4
  interestLevel: string;
}

export const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  instagramHandle: "",
  email: "",
  phone: "",
  painArea: "",
  painAreaOther: "",
  whyNotYet: [],
  interestLevel: "",
};
