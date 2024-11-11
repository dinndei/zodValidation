'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2'

// הגדרת סכמת המשתמש לאימות
const userSchema = z.object({
  name: z.string().min(2, { message: "השם צריך להיות לפחות 2 תווים" }),
  email: z.string().email({ message: "אימייל לא תקני" }),
  age: z.number().min(18, { message: "הגיל צריך להיות לפחות 18" }),
  isAdmin: z.boolean().optional(),
});

// סוג הנתונים עבור הטופס
type UserData = z.infer<typeof userSchema>;

const page: React.FC = () => {
  // הגדרת הטופס עם react-hook-form ו-zod לאימות
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "john dogh",
      email: "example@example.com",
      age: 20,
      isAdmin: true,
    },
  });

  // פונקציה שמטפלת בהגשת הטופס
  const onSubmit = (data: UserData) => {
    console.log("נתונים תקינים:", data);
    Swal.fire({
        title: "אלופים!",
        text: "הנתונים שלכם מצוינים",
        icon: "success"
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-28 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">טופס משתמש</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* שדה שם */}
        <div>
          <label className="block text-sm font-medium text-gray-700">שם</label>
          <input
            {...register("name")}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* שדה אימייל */}
        <div>
          <label className="block text-sm font-medium text-gray-700">אימייל</label>
          <input
            {...register("email")}
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* שדה גיל */}
        <div>
          <label className="block text-sm font-medium text-gray-700">גיל</label>
          <input
            {...register("age", { valueAsNumber: true })}
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

        {/* שדה האם מנהל */}
        <div className="flex items-center">
          <input
            {...register("isAdmin")}
            type="checkbox"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">האם מנהל?</label>
        </div>

        {/* כפתור שליחה */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            שלח
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
