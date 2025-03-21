"use client"

import { z } from "zod"

export const registerFormSchema = z.object({
    name: z.string().min(2).max(50),
    surname: z.string().min(2).max(50),
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email.")
})