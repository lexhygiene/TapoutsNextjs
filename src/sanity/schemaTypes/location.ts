import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'location',
    title: 'Location',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'City', value: 'City' },
                    { title: 'Town', value: 'Town' },
                    { title: 'County', value: 'County' },
                    { title: 'District', value: 'District' },
                    { title: 'Village', value: 'Village' },
                    { title: 'Borough', value: 'Borough' },
                ],
            },
        }),
        defineField({
            name: 'parent',
            title: 'Parent Location',
            type: 'reference',
            to: [{ type: 'location' }],
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
    ],
})
