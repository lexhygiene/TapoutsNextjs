import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'lead',
    title: 'Leads',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'topic',
            title: 'Topic',
            type: 'string',
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
        }),
        defineField({
            name: 'gdprConsent',
            title: 'GDPR Consent',
            type: 'boolean',
        }),
        defineField({
            name: 'newsletter',
            title: 'Newsletter Subscription',
            type: 'boolean',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Contacted', value: 'contacted' },
                    { title: 'Qualified', value: 'qualified' },
                    { title: 'Lost', value: 'lost' },
                ],
                layout: 'radio',
            },
            initialValue: 'new',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
        },
    },
})
