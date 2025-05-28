interface ImportMetaEnv {
  readonly NEON_DATABASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export type Log = {
  modified_id: number;
  id: number;
  message: string;
  timestamp: string;
}

import type { HTMLTag, Polymorphic } from "astro/types";

type ActionProps<Tag extends HTMLTag> = Polymorphic<{
	as: Tag;
	variant: keyof typeof predefinedClasses;
  body?: string;
  href?: HTMLAnchorElement["href"];
}>;
