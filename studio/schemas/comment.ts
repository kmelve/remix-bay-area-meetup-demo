import {defineField, defineType} from 'sanity'

export const comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Set to true to make this comment visible on the site.',
    }),
    defineField({
      name: 'text',
      title: 'Comment',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post', weak: true}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
