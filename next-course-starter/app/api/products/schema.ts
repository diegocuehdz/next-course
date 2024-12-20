import { z } from "zod";

export const product = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
});
