import { GetContactListQuery } from "./graphql/__generated__/graphql";

export type Contact = GetContactListQuery["contact"][number];
