"use client"
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

const BackButton = () => {
    const router = useRouter()
  return (
    <Button
      type="button"
      className="flex justify-center items-center"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-5 w-5" /> <p>Back</p>
    </Button>
  );
}

export default BackButton