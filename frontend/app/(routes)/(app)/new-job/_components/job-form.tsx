"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/shared/wrapper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z
    .string("Title is required.")
    .min(2, "Title must be at least 2 characters."),
  category: z
    .string("Job Category is required.")
    .min(2, "Job Category is required."),
  description: z
    .string("Job Category is required.")
    .min(2, "Job Category is required."),
});

const roles = [
  { value: "art", label: "ART", desc: "NFT, Graphics", img: "/home/nft.png" },
  {
    value: "developers",
    label: "DEVELOPERS",
    desc: "expert",
    img: "/home/developers.png",
  },
  {
    value: "manager",
    label: "COMMUNITY MANAGER",
    desc: "expert",
    img: "/home/manager.png",
  },
  { value: "writer", label: "WRITER", desc: "expert", img: "/home/writer.png" },
  {
    value: "marketers",
    label: "MARKETERS",
    desc: "expert",
    img: "/home/marketers.png",
  },
  { value: "ai", label: "AI", desc: "expert", img: "/home/ai.png" },
];

export const JobForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Wrapper size={"sm"} className="mx-0 max-w-[973px] px-0!">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h2 className="mx-auto text-center text-2xl font-semibold">
            Tell us about the Job
          </h2>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Job Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g Build a Defi lending Platform"
                    className="h-14 bg-[#070827DB] px-6 backdrop-blur-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Job Category *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                  >
                    {roles.map(({ value, label, desc, img }) => (
                      <Label
                        key={value}
                        htmlFor={value}
                        className="flex cursor-pointer flex-col items-start rounded-3xl border border-white/20 p-6 backdrop-blur-lg"
                      >
                        <div className="flex w-full items-start justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <RadioGroupItem value={value} id={value} />
                            </FormControl>
                            <p className="text-sm font-semibold uppercase">
                              {label}
                            </p>
                          </div>

                          <Image
                            src={img}
                            alt={value}
                            width={60}
                            height={60}
                            priority
                            quality={100}
                            className="size-20"
                          />
                        </div>

                        <p className="text-sm font-medium">{desc}</p>
                      </Label>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Job Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your project in detail. What are you looking to build? what’s the scope of work?"
                    className="min-h-52 bg-[#070827DB] px-6 backdrop-blur-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Required Skills & Technologies
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type and click Enter to add skills"
                    className="h-14 bg-[#070827DB] px-6 backdrop-blur-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Duration</FormLabel>
                <FormControl>
                  <Input
                    placeholder="24 hours"
                    className="h-14 bg-[#070827DB] px-6 backdrop-blur-lg"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Minimum 24 hours required</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-base">Budget *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$"
                      className="h-14 bg-[#070827DB] px-6 backdrop-blur-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Will be deducted from your wallet. when accepting a bid.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end">
              <Button type="submit" size={"lg"}>
                Create Job
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Wrapper>
  );
};
