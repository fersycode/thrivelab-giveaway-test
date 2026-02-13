import { z } from "zod";

export const giveawaySchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    instagramHandle: z.string().optional(),
    email: z.string().email("Invalid email format"),
    phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Invalid phone format"),
    painArea: z.enum(["knee", "shoulder", "back", "other"]),
    painAreaOther: z.string().optional(),
    whyNotYet: z.array(z.string()).min(1, "Select at least one option"),
    interestLevel: z.string().min(1, "Please select an option"),
  })
  .refine(
    (data) => {
      if (data.painArea === "other") {
        return data.painAreaOther && data.painAreaOther.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify the pain area",
      path: ["painAreaOther"],
    },
  );
