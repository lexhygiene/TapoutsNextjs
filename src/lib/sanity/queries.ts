import { groq } from "next-sanity";

// Placeholder queries for future use
export const GET_POSTS = groq`*[_type == "post"] { _id, title, slug, publishedAt }`;
export const GET_POST_BY_SLUG = groq`*[_type == "post" && slug.current == $slug][0]`;
