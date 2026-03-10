import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1).trim(),
  password: z.string().min(1),
});
