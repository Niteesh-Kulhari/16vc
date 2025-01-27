import { boolean, number, z } from "zod";

export const itemSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is Required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  pricePerDay: z.number().positive("Price Per day has to be positive"),
  availability: z.boolean().default(true),
  rentalDates: z
    .array(
      z.object({
        start: z
          .string()
          .refine((date) => !isNaN(Date.parse(date)), "Invalid Start Date"),
        end: z
          .string()
          .refine((date) => !isNaN(Date.parse(date)), "Invalid End Date"),
      })
    )
    .optional(),
});

export const returnSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid start Date"),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid end Date")
})


export const searchSchema = z.object({
  name: z.string()
    .optional()
    .refine(val => val === undefined || val.length > 0, {
      message: "Name must be a non-empty string if provided"
    }),
  minPrice: z.number()
    .optional()
    .refine(val => val === undefined || val >= 0, {
      message: "Min price must be a non-negative number"
    }),
  maxPrice: z.number()
    .optional()
    .refine(val => val === undefined || val >= 0, {
      message: "Max price must be a non-negative number"
    })
}).refine(data => {
  if (data.minPrice !== undefined && data.maxPrice !== undefined && data.minPrice > data.maxPrice) {
    return false;
  }
  return true;
}, {
  message: "Min price cannot be greater than max price",
  path: ["minPrice", "maxPrice"]
});


export const rentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid Start Date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid End Date",
  }),
});

export type Rent = z.infer<typeof rentSchema>;
export type Item = z.infer<typeof itemSchema>;

// export interface Item {
//     id: number;
//     name: string;
//     description: string;
//     pricePerDay: number;
//     availability: boolean;
//     rentalDates: {start: string, end: string}[];
// }
