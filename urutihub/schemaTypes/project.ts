import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Websites', value: 'websites'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'UI/UX', value: 'ui/ux'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'techStacksUsed',
      title: 'Tech Stacks Used',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'ReactJS', value: 'reactjs'},
              {title: 'NodeJS', value: 'nodejs'},
              {title: 'Figma', value: 'figma'},
            ],
            layout: 'tags',
          },
        },
      ],
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
          allowRelative: false,
        }),
    }),
  ],
})
