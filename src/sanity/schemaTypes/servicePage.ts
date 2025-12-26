import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'servicePage',
    title: 'Service Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'serviceType',
            title: 'Service Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Gen AI', value: 'Gen AI' },
                    { title: 'Web Development', value: 'Web Development' },
                ],
            },
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'reference',
            to: [{ type: 'location' }],
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            location: 'location.name',
        },
        prepare(selection) {
            const { location } = selection
            return { ...selection, subtitle: location ? `in ${location}` : '' }
        },
    },
})
