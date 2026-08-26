import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'digitalai-learning-studio',
  title: 'DigitalAI Learning — Admin',

  projectId,
  dataset,
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Blog Posts').child(S.documentTypeList('blogPost').title('Blog Posts')),
            S.listItem().title('Courses').child(S.documentTypeList('course').title('Courses')),
            S.listItem().title('Site FAQs').child(S.documentTypeList('siteFaq').title('Site FAQs')),
            S.listItem().title('Authors').child(S.documentTypeList('author').title('Authors')),
          ]),
    }),
    // Vision lets you run raw GROQ queries from inside the Studio — handy for debugging.
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: { types: schemaTypes },
});
