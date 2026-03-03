import { z } from "zod";

export const selectBody = z.object({
  name: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  occupation: z.enum(["Railway", "Committee", "Others"]),
});

export type selectBody = z.infer<typeof selectBody>;

export const createFormBody = z.object({
  name: z.string().min(1),
  date: z.string().min(1),
  occupation: z.enum(["Railway", "Committee", "Others"]),
  entities: z.preprocess(
    (val) => {
      if (Array.isArray(val)) return val;
      if (val === undefined) return [];
      return [val];
    },
    z.array(z.string()).min(1, "Select at least one entity"),
  ),
});

export type createFormBody = z.infer<typeof createFormBody>;
