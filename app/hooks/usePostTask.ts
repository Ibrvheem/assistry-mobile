import { useForm } from "react-hook-form";
import { postTask } from "../services";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";

export function usePostTask({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const methods = useForm({
    // resolver: zodResolver(createTaskSchema),
  });
  const { handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      router.push("/(dashboard)");
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error Fetching Data:", error);
    },
  });
  const onSubmit = handleSubmit(async (values) => {
    const payload = {
      ...values,
      expires: Number(values.expires),
      incentive: Number(values.incentive),
    };
    console.log(payload);
    mutation.mutate({
      ...values,
      expires: Number(values.expires),
      incentive: Number(values.incentive),
    });
  });
  return {
    onSubmit,
    methods,
    loading: mutation.isPending,
    error: mutation.isError,
  };
}
