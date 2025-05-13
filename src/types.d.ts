import type { HTMLTag, Polymorphic } from "astro/types";

type ActionProps<Tag extends HTMLTag> = Polymorphic<{
	as: Tag;
	variant: keyof typeof predefinedClasses;
  body?: string;
  href?: HTMLAnchorElement["href"];
}>;