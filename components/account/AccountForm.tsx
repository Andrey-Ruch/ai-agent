"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {toast} from "sonner"; //"react-hot-toast";
import { Loader2 } from "lucide-react";
import { assistantsData } from "@/data/assistants";
import Image from "next/image";
import { AccountTabsProps } from "./AccountTabs";

const LANGUAGE_OPTIONS = [
  { text: "English", value: "en-US" },
  { text: "עברית", value: "he-IL" },
  { text: "Français", value: "fr-FR" },
  { text: "Deutsche", value: "de-DE" },
  { text: "Español", value: "es-ES" },
] as const;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Please enter a valid phone number"
    ),
  language: z.enum(["en-US", "he-IL", "fr-FR", "de-DE", "es-ES", ""]),
  gender: z
    .enum(["male", "female", "other", "prefer-not-to-say", ""])
    .optional(),
  assistant: z
    .enum(assistantsData.map((assistant) => assistant.name) as [string, ...string[]])
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

const AccountForm = ({assistant, gender, language, phone, name}: AccountTabsProps) => {
  const router = useRouter();
  
  // Define form with React Hook Form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      phone: phone || null,
      language: (language as FormData["language"]) || "en-US",
      gender: (gender as FormData["gender"]) || "",
      assistant: assistant || assistantsData[0].name, // Default to the first assistant
    },
  });

  // Define a submit handler
  async function onSubmit(data: FormData) {
    try {
      console.log("Submitting data:", data);

      // Include the user ID if it exists
      const userData = {
        ...data,
        // _id: user._id,
      };
      console.log("User data to be sent:", userData);
      
      const response = await fetch(`/api/account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userData,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Account updated successfully");
        // Refresh the page to get updated data
        router.refresh();
      } else {
        console.error("Error response:", responseData);
        toast.error(responseData.error || "Failed to update account");
        form.setError("root", {
          message: responseData.error || "Failed to update account",
        });
      }
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("An error occurred while updating your account");
      form.setError("root", {
        message: "An error occurred while updating your account",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-wrap justify-between">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1 w-full px-4 md:w-1/2">
              <FormLabel className="text-primary min-h-10 m-0">Name</FormLabel>
              <FormControl>
                <Input
                  className=" bg-white rounded-xl"
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="nickName"
          render={({ field }) => (
            <FormItem className="space-y-1 w-full px-4 md:w-1/2">
              <FormLabel className="text-primary">Nickname</FormLabel>
              <FormControl>
                <Input
                  className=" bg-white rounded-xl"
                  placeholder="Johnny"
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional nickname</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-1  w-full px-4 md:w-1/2">
              <FormLabel className="text-primary min-h-10 m-0">Phone</FormLabel>
              <FormControl>
                <Input
                  className=" bg-white rounded-xl"
                  placeholder="+1 (555) 123-4567"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="space-y-1  w-full px-4 md:w-1/2">
              <FormLabel className="text-primary min-h-10 m-0">Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className=" bg-white rounded-xl">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-xl">
                  {LANGUAGE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-1  w-full px-4 md:w-1/2 ">
              <FormLabel className="text-primary min-h-10 m-0">Gender (Optionaly - so we can personalize your experience)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className=" bg-white rounded-xl">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-xl">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assistant"
          render={({ field }) => (
            <FormItem className="space-y-1  w-full px-4 md:w-1/2">
              <FormLabel className="text-primary min-h-10 m-0">Assistant</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className=" bg-white rounded-xl">
                    <SelectValue placeholder="Select assistant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-xl">
                  {assistantsData.map((option) => (
                    <SelectItem key={option.name} value={option.name} className="justify-start">
                      <Image
                        src={option.imgSrc}
                        alt={option.name}
                        width={30}
                        height={30}
                        style={{ borderRadius: "50%", marginRight: "8px", float: "inline-start" }}
                      />
                      <span className="align-middle">{option.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        {form.formState.errors.root && (
          <div className="text-red-500">
            {form.formState.errors.root.message}
          </div>
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="rounded-xl "
          // size="lg"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Please wait
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AccountForm;
