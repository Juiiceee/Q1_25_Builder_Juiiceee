"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const LinkButton: React.FC<{ songId: string }> = ({ songId }) => {
  const [isLoading, setIsLoading] = useState(false);

//   const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      youtubeLink: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

    //   if (!user) {
    //     toast.error("User not logged in");
    //     return;
    //   }

    //   const { error } = await supabaseClient
    //     .from("songs")
    //     .update({ youtube_link: values.youtubeLink })
    //     .eq("id", songId);

    //   if (error) {
    //     toast.error(error.message);
    //   } else {
        toast.success("YouTube link added successfully!");
        reset();
    //   }
    } catch (error: any) {
      toast.error(`Something went wrong: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded"
        onClick={()=>{}}
      >
        Add YouTube Link
      </button>
      <Modal
        title="Add YouTube Link"
        description="Please enter your YouTube link for this song."
        isOpen={false}
        onChange={()=>{}}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
          <Input
            id="youtubeLink"
            disabled={isLoading}
            {...register("youtubeLink", { required: true })}
            placeholder="youtu.be/XXXXXXXXXXX"
          />
          <Button disabled={isLoading} type="submit">
            Add Link
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default LinkButton;
