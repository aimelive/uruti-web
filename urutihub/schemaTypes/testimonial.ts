import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'image',
      options: {
        hotspot: true, // Enable cropping of images
      },
    }),
    defineField({
      name: 'testimony',
      title: 'Testimony',
      type: 'text',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
})
