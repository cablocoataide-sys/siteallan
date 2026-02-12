import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projetos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'object',
      fields: [
        {name: 'pt', type: 'string', title: 'Português'},
        {name: 'en', type: 'string', title: 'English'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição (aparece na home)',
      type: 'object',
      fields: [
        {name: 'pt', type: 'text', title: 'Português', rows: 3},
        {name: 'en', type: 'text', title: 'English', rows: 3},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Imagem de Capa (qualquer tamanho - ajusta automático)',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/*',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
      description: 'Adicione imagens na ordem que quer que apareçam. Qualquer tamanho é aceito!',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Tipo (opcional)',
              options: {
                list: [
                  {title: 'Wide (2160x1080px)', value: 'wide'},
                  {title: 'Square (1080x1080px)', value: 'square'},
                ],
                layout: 'radio',
              },
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo (opcional)',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'about',
      title: 'Sobre o Projeto',
      type: 'object',
      fields: [
        {name: 'pt', type: 'text', title: 'Português', rows: 6},
        {name: 'en', type: 'text', title: 'English', rows: 6},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'results',
      title: 'Resultados',
      type: 'object',
      fields: [
        {name: 'pt', type: 'text', title: 'Português', rows: 6},
        {name: 'en', type: 'text', title: 'English', rows: 6},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      description: 'Número menor aparece primeiro',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      titlePt: 'title.pt',
      titleEn: 'title.en',
      media: 'thumbnail',
      order: 'order',
    },
    prepare(selection) {
      const {titlePt, titleEn, media, order} = selection
      return {
        title: titlePt || titleEn,
        subtitle: `Ordem: ${order}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Ordem de Exibição',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
