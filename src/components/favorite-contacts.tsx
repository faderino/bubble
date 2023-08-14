import theme from "@/styles/theme";
import { Sparkles } from "lucide-react";
import ContactList from "./contact-list/contact-list";
import ContactListTitle from "./contact-list/contact-list-title";
import { Contact } from "@/types";

const contacts: Contact[] = [
  {
    created_at: "2023-08-13T13:57:02.691324+00:00",
    first_name: "John7",
    id: 2894,
    last_name: "Doe2",
    phones: [
      {
        number: "+6292229292922374ds411",
      },
      {
        number: "+6292921192922dsd34422",
      },
    ],
  },
  {
    created_at: "2023-08-13T14:00:34.296799+00:00",
    first_name: "odin",
    id: 2895,
    last_name: "wahyudin",
    phones: [
      {
        number: "2211444",
      },
      {
        number: "22111344",
      },
    ],
  },
  {
    created_at: "2023-08-13T14:01:01.426679+00:00",
    first_name: "odin",
    id: 2896,
    last_name: "wahyudin",
    phones: [
      {
        number: "221122",
      },
      {
        number: "1112211",
      },
    ],
  },
  {
    created_at: "2023-08-13T14:05:29.456485+00:00",
    first_name: "hhoho",
    id: 2897,
    last_name: "hihih",
    phones: [
      {
        number: "3411112",
      },
      {
        number: "+22313",
      },
      {
        number: "2221333",
      },
      {
        number: "1111111",
      },
    ],
  },
  {
    created_at: "2023-08-13T14:07:04.612267+00:00",
    first_name: "hihihoho",
    id: 2898,
    last_name: "",
    phones: [
      {
        number: "222",
      },
    ],
  },
  {
    created_at: "2023-08-13T11:33:23.398186+00:00",
    first_name: "DIHAPUS",
    id: 2880,
    last_name: "DOSA",
    phones: [
      {
        number: "0999999991",
      },
      {
        number: "0999999992",
      },
    ],
  },
  {
    created_at: "2023-08-13T11:33:51.038378+00:00",
    first_name: "DIHAPUS",
    id: 2881,
    last_name: "DOSA 2",
    phones: [
      {
        number: "099999991",
      },
      {
        number: "09999992",
      },
    ],
  },
  {
    created_at: "2023-08-13T11:38:02.978845+00:00",
    first_name: "DIHAPUS",
    id: 2883,
    last_name: "DOSA",
    phones: [
      {
        number: "12345",
      },
      {
        number: "6789",
      },
    ],
  },
  {
    created_at: "2023-08-13T12:06:16.220168+00:00",
    first_name: "aadsfsfaf",
    id: 2886,
    last_name: "asdfasfdasfqw",
    phones: [
      {
        number: "3536345",
      },
    ],
  },
  {
    created_at: "2023-08-13T11:02:43.519314+00:00",
    first_name: "baa",
    id: 2878,
    last_name: "aa",
    phones: [
      {
        number: "5342342",
      },
    ],
  },
  {
    created_at: "2023-08-13T11:36:00.950498+00:00",
    first_name: "DIHAPUS",
    id: 2882,
    last_name: "DOSA",
    phones: [
      {
        number: "1321312414124",
      },
    ],
  },
  {
    created_at: "2023-08-12T12:05:16.245607+00:00",
    first_name: "halo",
    id: 2846,
    last_name: "berubahh",
    phones: [
      {
        number: "12127676",
      },
    ],
  },
  {
    created_at: "2023-08-13T12:16:01.217317+00:00",
    first_name: "aben",
    id: 2887,
    last_name: "ganteng",
    phones: [
      {
        number: "08123748483",
      },
    ],
  },
  {
    created_at: "2023-08-13T12:37:52.969866+00:00",
    first_name: "John2",
    id: 2888,
    last_name: "Doe2",
    phones: [
      {
        number: "+62929292922374ds4",
      },
      {
        number: "+62929292922dsd344",
      },
    ],
  },
  {
    created_at: "2023-08-13T12:38:27.255783+00:00",
    first_name: "John2111",
    id: 2890,
    last_name: "Doe2",
    phones: [
      {
        number: "+62929292922374ds41",
      },
      {
        number: "+62929292922dsd3442",
      },
    ],
  },
  {
    created_at: "2023-08-13T12:38:39.282166+00:00",
    first_name: "John2333",
    id: 2891,
    last_name: "Doe2",
    phones: [
      {
        number: "+62929292922374ds411",
      },
      {
        number: "+62929292922dsd34422",
      },
    ],
  },
  {
    created_at: "2023-08-12T12:05:04.565339+00:00",
    first_name: "halo7323890a",
    id: 2844,
    last_name: "yooooo",
    phones: [
      {
        number: "888875",
      },
    ],
  },
  {
    created_at: "2023-08-13T13:36:29.522317+00:00",
    first_name: "DIHAPUS",
    id: 2893,
    last_name: "DOSA",
    phones: [
      {
        number: "+629vf92922374ds4",
      },
      {
        number: "+62ff92922dsd344",
      },
    ],
  },
];

export default function FavoriteContacts() {
  return (
    <ContactList contacts={contacts}>
      <ContactListTitle>
        <Sparkles size="1.1rem" color={theme.colors.yellow} />
        FAVORITE CONTACTS ({4})
      </ContactListTitle>
    </ContactList>
  );
}
