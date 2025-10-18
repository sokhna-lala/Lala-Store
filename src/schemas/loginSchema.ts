import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide").min(1, "Email requis"),
  password: z
    .string()
    .min(6, "Mot de passe doit contenir au moins 6 caractères"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
