'use server';

import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export async function fetchMorePosts(start: number, end: number) {
    const query = groq`
    *[_type=='post'] {
      ...,
      author->,
      categories[]->
    } | order(publishedAt desc) [${start}...${end}]
  `;

    return await client.fetch(query);
}
