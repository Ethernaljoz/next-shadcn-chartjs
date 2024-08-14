"use client"


import TodoEditForm from "./form/TodoEditForm";
import DeleteButton from "./DeleteButton";
import { Button } from "./ui/button";
import { Square, SquareCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { toast } from "./ui/use-toast";

interface todoProps {
  
    key: string;
    todo: props 
}

interface props {
  id: string;
  task: string;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorEmail: string;
}

const Task = ({todo}:todoProps) => {

  const router = useRouter()
  const [checked,setChecked] = useState(todo.isComplete)
  
  const handleCheck = async(id:string)=>{
    setChecked(true)
    const values = { isComplete: true };
    await axios
      .put(`/api/todo/${todo.id}`, values)
      .then((res) => {
        console.log(res);      
        router.refresh();
        toast({
          variant: "success",
          title: "task done successfully "
        });
      })
      .catch((error) => {
        console.log(error);
    
      });
  } 
 

  return (
    <div className="flex justify-between shadow-md rounded-sm py-2 px-3 bg-slate-50">
      <div className="flex items-center space-x-2">
        <Button onClick={()=>handleCheck(todo.id)} className="p-0 " variant={"ghost"} size="icon">
          {checked ? <SquareCheckBig className="text-black h-5 w-5" /> : <Square className="text-black h-5 w-5" />}
        </Button>
        <p
         
          className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {todo.task}
        </p>
      </div>
      <div  className="flex gap-3 justify-center items-center">
        <TodoEditForm oldValue={todo.task} todoId={todo.id} />
        <DeleteButton path="todo" id={todo.id} />
      </div>
    </div>
  );
};

export default Task;
