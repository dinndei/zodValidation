import {z} from "zod";

const userSchema=z.object({
    name: z.string().min(2, { message: "השם צריך להיות לפחות 2 תווים" }),
    email: z.string().email({ message: "אימייל לא תקני" }),
    age: z.number().min(0, { message: "הגיל צריך להיות לפחות 18" }).max(120,{message:"גיל לא תקין"}),
    isAdmin: z.boolean().optional(),
});

const userData = {
    name: "דוגמה",
    email: "example@example.com",
    age: 20,
    isAdmin: true,
  };
  
  try {
    const validatedUserData = userSchema.parse(userData);
    console.log("נתונים תקינים:", validatedUserData);
  } catch (error) {
    // טיפול בשגיאות אימות
    if (error instanceof z.ZodError) {
      console.log("שגיאות אימות:", error.errors);
    }
  }