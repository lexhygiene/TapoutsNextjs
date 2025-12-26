import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import BrandName from '@/components/BrandName';

// ...

// Helper to style 'tapouts' in text
const styleBrandName = (children: any) => {
    if (typeof children !== 'string' && !Array.isArray(children)) return children;

    // Flatten if array of strings (simple case)
    const text = Array.isArray(children) ? children.join('') : children;

    if (typeof text !== 'string') return children;

    const parts = text.split(/(tapouts)/gi);

    return parts.map((part, i) =>
        part.toLowerCase() === 'tapouts' ? <BrandName key={i} /> : part
    );
};

export const RichTextComponents = {
    types: {
        // ... (image type remains same)
        image: ({ value }: any) => {
            return (
                <div className="relative w-full h-96 m-10 mx-auto">
                    <Image
                        className="object-contain"
                        src={urlFor(value).url()}
                        alt="Blog Post Image"
                        fill
                    />
                </div>
            );
        },
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="ml-10 py-5 list-disc space-y-5">{styleBrandName(children)}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="mt-lg list-decimal text-lg">{styleBrandName(children)}</ol>
        ),
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-5xl py-10 font-bold">{styleBrandName(children)}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-4xl py-10 font-bold">{styleBrandName(children)}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-3xl py-10 font-bold">{styleBrandName(children)}</h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-2xl py-10 font-bold">{styleBrandName(children)}</h4>
        ),
        normal: ({ children }: any) => (
            <p className="py-2">{styleBrandName(children)}</p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-indigo-500 border-l-4 pl-5 py-5 my-5">
                {styleBrandName(children)}
            </blockquote>
        ),
    },
    marks: {
        // ...
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith('/')
                ? 'noreferrer noopener'
                : undefined;

            return (
                <Link
                    href={value.href}
                    rel={rel}
                    className="underline decoration-indigo-500 hover:decoration-black"
                >
                    {children}
                </Link>
            );
        },
    },
};
