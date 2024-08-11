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
import { BlogSchema } from "@/lib/types";

import { Loader2, X } from "lucide-react";
import Image from "next/image";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";





export default function BlogEditForm() {
  const form = useForm<z.infer<typeof BlogSchema>>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl:""
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  function convertToBase64(file: any) {
    if (!file) {
      return null;
    } else {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
  }

  const onSubmit = async (values: z.infer<typeof BlogSchema>) => {
    setIsLoading(true);

    await axios
      .post("/api/blog", values)
      .then((res) => {
        setIsLoading(false);
        setShowModal(false);
        form.reset();
        setImageUrl("")
        router.refresh();
        toast({
          variant: "success",
          title: "blog create successfully ",

          // action: <ToastAction altText="Try again">Try again</ToastAction>,
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
        Edit Blog
      </Button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[425px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-[425px]">
              <div className="flex  space-y-1.5 text-center sm:text-left justify-between">
                <h3 className="text-lg font-semibold leading-none tracking-tight">
                  Edit blog
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
                  encType="multipart/form-data"
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

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel
                          className={`${
                            imageUrl
                              ? ""
                              : "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                          }`}
                        >
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt="blog img"
                              height={250}
                              width={500}
                              style={{ width: 500, height: 250 }}
                              layout="fixed"
                              className="rounded-md object-cover inset-0 w-full"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG, JPEG
                              </p>
                            </div>
                          )}
                        </FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            onChange={async (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const file = e.target.files
                                ? e.target.files[0]
                                : null;
                              const base64 = await convertToBase64(file);

                              onChange(base64);
                              setImageUrl(base64 as string);
                            }}
                            className="h-10 hidden"
                            type="file"
                            accept=".jpeg, .png, .jpg, .svg"
                            max={1}
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
                      onClick={() => {setShowModal(false),form.reset() ,setImageUrl("")}}
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
                        "Edit"
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
