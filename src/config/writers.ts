import type { ImageMetadata } from "astro";

export interface WriterProfile {
  bio: string;
  image?: ImageMetadata;
  creditName?: string;
  creditUrl?: string;
}

export const writerProfiles: Record<string, WriterProfile> = {
  "Pablo Saenz de Tejada": {
    bio: "Solutions Engineer at Snowflake. Helping customers get the most out of the Snowflake platform.",
  },
};

export const writerProfile = (name: string): WriterProfile | undefined => writerProfiles[name];

export const writerBio = (name: string): string => writerProfiles[name]?.bio ?? "";
