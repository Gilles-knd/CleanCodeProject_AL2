import { test, expect } from "@playwright/test";

const CARD = {
  question: "Pourquoi le prof de clean clode est aussi good ?",
  answer: "C'est un GOAT c'est tout!",
  tag: "Clean Code",
};
const TOAST_TEXT_SUCCESS = "Votre fiche a bien été créer";

test.describe("Création de fiches en catégorie 1", () => {
  test("L'utilisateur peut créer une fiche en catégorie 1", async ({
    page,
  }) => {
    // And - Accès à la page de création de fiche
    await page.goto("/");

    // And - Ouvrir le modal de création de carte
    await page.click("id=open-card-drawer");

    // When - Renseignement des informations de la fiche
    await page.fill('textarea[name="question"]', CARD.question);
    await page.fill('textarea[name="answer"]', CARD.answer);
    await page.fill('input[name="tag"]', CARD.tag);

    // And - Soumission du formulaire
    await page.click("id=create-card");

    // // Then - Vérifier la présence du message de confirmation
    await expect(page.locator("#toast-text")).toHaveText(TOAST_TEXT_SUCCESS);

    // And - Vérifier que la fiche apparaît bien dans la liste
    const createdCard =  page.locator("#card-question").last();
     expect(await createdCard.textContent()).toBe(CARD.question);
  });
});
