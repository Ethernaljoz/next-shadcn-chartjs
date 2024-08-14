"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "@/lib/types";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { toast } from "../ui/use-toast";




export default function PostForm() {
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

    const onSubmit = async (values: z.infer<typeof PostSchema>) => {
      setIsLoading(true);

      await axios
        .post(`/api/post/`, values)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          setShowModal(false);
          form.reset();
          router.refresh();
          toast({
            variant: "success",
            title: "post create successfully ",
          });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
          });
        });
    };
  return (
    <>
      <Button type="button" onClick={() => setShowModal(true)}>
        Add Post
      </Button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[425px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-[425px]">
              <div className="flex  space-y-1.5 text-center sm:text-left justify-between">
                <h3 className="text-lg font-semibold leading-none tracking-tight">
                  Add post
                </h3>
                <button
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                  onClick={() => setShowModal(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="enter the title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder=" enter the content"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between gap-5">
                    <Button
                      variant="outline"
                      className="w-full"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>Please wait</span>
                        </>
                      ) : (
                        "Create"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
