"use client";

import { Button } from "@/ui/atoms/Button/Button";
import { Heading } from "@/ui/atoms/Heading/Heading";
import { ArrowRight } from "@icons";
import { TextBox } from "@/ui/atoms/Inputs/TextBox/TextBox";
import { TextField } from "@/ui/atoms/Inputs/TextField/TextField";
import { Text } from "@/ui/atoms/Text/Text";
import { Stack } from "@/ui/layouts/Stack/Stack";
import Logo from "@/ui/atoms/Logo/Logo";
import React, { FormEvent } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLabel, setButtonLabel] = React.useState("Je créer mon compte");

  const register = (e: FormEvent) => {
    e.preventDefault();
    setButtonLabel("Veuillez pattientez");
    setIsLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    console.log(formData.get("email"));
    //Register user
    setIsLoading(false);
  };

  return (
    <Stack
      direction="row"
      className="w-full h-full bg-zinc-50 p-4 md:p-0"
      align="center"
      justify="center"
    >
      <form
        className="flex flex-col space-y-4 items-center"
        onSubmit={register}
      >
        <Logo />
        <Stack
          className="w-full h-auto bg-white max-w-80 p-6 rounded-2xl
      border border-solid shadow-sm space-y-4"
          direction="col"
        >
          <Stack direction="col" gapy={8}>
            <Heading level={4} className=" text-lg font-semibold">
              Créer mon compte
            </Heading>
            <Text className="!text-zinc-500 !text-xm">
              Créer votre compte pour gérer facilement vos fiches de révisions
            </Text>
          </Stack>

          <TextField
            type="email"
            label="Email"
            name="email"
            required
            invalid={true}
            errorMessage="Cet email est déjà enregistré"
            placeholder="toto@gmail.com"
          />

          <Stack direction="col" gapy={4} align="center">
            <Button
              type="submit"
              label={buttonLabel}
              className="w-full"
              disabled={isLoading}
              loading={isLoading}
            />

            <Link
              href={"/auth/login"}
              className="text-xs text-zinc-600 hover:underline"
            >
              J'ai déjà un compte
            </Link>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
