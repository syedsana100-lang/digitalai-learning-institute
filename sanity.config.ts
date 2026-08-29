import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/studioStructure';

export default defineConfig({
  name: 'digitalai-learning-studio',
  title: 'DigitalAI Learning — Admin',

  projectId,
  dataset,
  basePath: '/studio',

  plugins: [
    structureTool({ structure }),
    // Vision lets you run raw GROQ queries from inside the Studio — handy for debugging.
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: { types: schemaTypes },
});
