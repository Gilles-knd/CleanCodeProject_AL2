"use client";

import { CARDS } from "@/constants/cards";
import { Badge } from "@/ui/atoms/Badge/Badge";
import { Button } from "@/ui/atoms/Button/Button";
import { Heading } from "@/ui/atoms/Heading/Heading";
import { TextBox } from "@/ui/atoms/Inputs/TextBox/TextBox";
import { Text } from "@/ui/atoms/Text/Text";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { VisibilityToggle } from "@/ui/molecules/VisibilityToggle/VisibilityToggle";
import { AppHeader } from "@/ui/organisms/AppHeader/AppHeader";
import { QuizzProgress } from "@/ui/pages/quizz/Progress";
import { ArrowRight, BicepsFlexed, Eye, Play } from "@icons";
import React from "react";
import * as Modal from "@ui/organisms/Modal/Modal";
import { useFetch } from "@/hooks/useFetch";
import {
  answerQuestionRequest,
  getTodayQuizzRequest,
} from "@/services/fetch.service";
import { HttpService } from "@/services/Http.service";

export default function QuizzPage() {
  const { isLoading, data, error } = useFetch("quizz", getTodayQuizzRequest);
  const quizz = data || [];
  const stepCount = quizz.length - 1;
  const [currentStep, setCurrentStep] = React.useState(-1);
  const [currentCard, setCurrentCard] = React.useState(quizz[currentStep]);
  const [answer, setAnswer] = React.useState("");
  const progress = (currentStep / stepCount) * 100;
  const [isPostAnswerLoading, setIisPostAnswerLoading] = React.useState(false);
  const [buttonLabel, setButtonLabel] = React.useState("Continuer");
  const showSquizz =
    (currentCard && currentStep >= 0 && currentStep <= stepCount) || false;

  const postAnswer = async (answer: string) => {
    return answerQuestionRequest(currentCard.id, {
      isValid: answer == currentCard.answer,
    });
  };

  const nextStep = async () => {
    if (currentStep < stepCount) {
      if (!answer) return;
      setIisPostAnswerLoading(true);
      const res = await postAnswer(answer);

      if ("ok" in res && res.ok) {
        setCurrentStep(currentStep + 1);
        setCurrentCard(quizz[currentStep + 1]);
        setAnswer("");
      }

      setIisPostAnswerLoading(false);
    }

    if (currentStep === stepCount - 1) {
      setButtonLabel("Terminer");
    }

    if (currentStep === stepCount) {
      setCurrentStep(currentStep + 1);
      closeQuizz();
    }
  };

  const startQuizz = () => {
    setCurrentStep(0);
    setCurrentCard(quizz[0]);
  };

  const submitAnswer = (answer: string) => {
    // Submit answer to backend
    nextStep();
  };

  const closeQuizz = () => {};

  return (
    <div className="h-full w-full">
      <AppHeader title={"Quizz"}>
        <VisibilityToggle visible={showSquizz}>
          <QuizzProgress
            progress={progress}
            text={`${currentStep}/${stepCount}`}
          />
        </VisibilityToggle>
      </AppHeader>

      {/* Message de début de quizz */}
      <VisibilityToggle visible={currentStep < 0}>
        <div className="p-10 flex justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Heading level={3} className="font-medium">
              Démarrer un quizz
            </Heading>
            <Text className="text-center max-w-96">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              ipsum nemo perferendis, atque omnis? Ratione incidunt at aliquam
              veritatis illum debitis?
            </Text>
            <Button
              label={"Démarrer"}
              icon={<Play size={16} />}
              position="left"
              onClick={startQuizz}
            />
          </div>
        </div>
      </VisibilityToggle>

      {/* Message de fin de quizz */}
      <VisibilityToggle visible={currentStep > stepCount}>
        <div className="p-10 flex justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Heading level={3} className="font-medium">
              Vous avez terminer le quizz
            </Heading>
            <Text className="text-center max-w-96">
              Revenez demain pour un nouveau quizz
            </Text>
            <Button label={"Voir les fiches"} />
          </div>
        </div>
      </VisibilityToggle>

      {/* Cartes de quizz */}
      {showSquizz && (
        <div className="h-full w-full pt-8">
          <Stack
            className="h-full max-w-2xl mx-auto"
            direction={"col"}
            justify="space-between"
            align="center"
          >
            <div className="space-y-2 w-full">
              <Heading level={4} className="text-sm text-zinc-600 !font-medium">
                Question
              </Heading>
              <span className="flex items-start w-full p-4 rounded-2xl bg-zinc-100">
                {currentCard.question}
              </span>

              <Stack direction={"row"} gapx={4}>
                <Badge text={currentCard.category} type="success" />

                <VisibilityToggle
                  visible={
                    currentCard.tag !== "" || currentCard.tag !== undefined
                  }
                >
                  <Badge text={currentCard.tag || ""} type="primary" />
                </VisibilityToggle>
              </Stack>
            </div>
            <span className="h-full w-1 rounded-full bg-gray-100" />

            <Stack className="w-full" direction="col" gapy={8}>
              <Stack direction={"col"} gapy={4}>
                {/* Entête Réponse */}
                <Stack
                  direction={"row"}
                  justify={"space-between"}
                  align="center"
                  gapx={4}
                >
                  <Heading
                    level={4}
                    className="text-sm !text-zinc-500 !font-medium"
                  >
                    Votre réponse
                  </Heading>

                  {/* Comparaison de réponses */}
                  <Modal.Root title="Comparaison de réponses">
                    <Modal.Trigger asChild>
                      <Button
                        label={"Comparer avec la réponse d'origine"}
                        variant="outline"
                        className="!py-1"
                        icon={<Eye size={16} />}
                      />
                    </Modal.Trigger>
                    <Stack direction={"col"} gapy={16}>
                      <Stack direction={"col"} gapy={4}>
                        <Heading level={4} className="text-sm !text-zinc-500">
                          Ta réponse
                        </Heading>
                        <TextBox
                          placeholder={"Votre réponse"}
                          onChange={(e) => setAnswer(e.target.value)}
                          value={answer}
                          className="w-full bg-zinc-100 border-none rounded-2xl"
                        />
                        {/* <span className="p-4 rounded-2xl bg-zinc-100 min-h-24">
                        {answer}
                      </span> */}
                      </Stack>

                      <Stack direction={"col"} gapy={4}>
                        <Heading level={4} className="text-sm !text-zinc-500">
                          Réponse d'origine
                        </Heading>
                        <span className="p-4 rounded-2xl bg-zinc-100">
                          {currentCard.answer}
                        </span>
                      </Stack>
                    </Stack>

                    <Modal.Action asChild>
                      <Button
                        label={"Forcer la validation"}
                        icon={<BicepsFlexed size={16} />}
                        position="right"
                        variant="primary"
                        disabled={!answer}
                      />
                    </Modal.Action>
                  </Modal.Root>
                </Stack>

                <TextBox
                  placeholder={"Votre réponse"}
                  onChange={(e) => setAnswer(e.target.value)}
                  value={answer}
                  className="w-full bg-zinc-100 border-none rounded-2xl"
                />
              </Stack>

              <Stack direction={"row"} justify={"end"} gapx={8}>
                <Button
                  label={buttonLabel}
                  icon={<ArrowRight size={16} />}
                  position="right"
                  onClick={nextStep}
                  disabled={!answer}
                  loading={isPostAnswerLoading}
                />
              </Stack>
            </Stack>
          </Stack>
        </div>
      )}
    </div>
  );
}
