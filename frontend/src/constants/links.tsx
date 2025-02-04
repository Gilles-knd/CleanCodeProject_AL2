import {
  FileText,
  Inbox,
  Settings2,
} from "@icons";

const navLinks = [
  { name: "Fiches", href: "/dashboard/cards", icon: <FileText size={16} /> },
  { name: "Quizz", href: "/dashboard/quizz", icon: <Inbox size={16} /> },
  {
    name: "Paramètres",
    href: "/dashboard/settings",
    icon: <Settings2 size={16} />,
  },
];

export default [...navLinks];
