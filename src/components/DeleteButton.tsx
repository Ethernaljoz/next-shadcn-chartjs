"use client";
import React from "react";
import { Button } from "./ui/button";
import { Loader2, Trash2, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


interface props{
  path:string,
  id:string
}

const DeleteButton = ({path,id}:props) => {


  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

   const handleDeleteTask = async(id:string,path:string) => {
    //  e.preventDefault();
    //  const values:object = {id:id}
    setIsLoading(true)
     await axios
     .delete(`/api/${path}/${id}`)
     .then((res)=> {
      console.log(res)
      setIsLoading(false)
      setShowModal(false)
      if(path === "blog" || path === "post"){
        router.back()
      }else{
        
        router.refresh()
      }
    })
     .catch((error)=>{
      console.log(error)
      setIsLoading(false)
      setShowModal(false)
    })
    //  setIsLoading(false)
   }; 


  return (
    <>
      <Button
        type="button"
        onClick={() => setShowModal(true)}
        variant={"destructive"}
      >
        <Trash2 className="h-6 w-6" />
      </Button>

      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[425px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-[425px]">
              <div className="flex  space-y-1.5 text-center sm:text-left justify-between">
                <h3 className="text-lg font-semibold leading-none tracking-tight">
                  Delete todo
                </h3>
                <button
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                  onClick={() => setShowModal(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </div>

              <h3>Do you want to delete this {path} ?</h3>

              <div className="flex justify-between gap-5">
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleDeleteTask(id, path)}
                  className="w-full"
                  type="submit"
                  disabled={isLoading}
                  variant={"destructive"}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Please wait</span>
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DeleteButton;
