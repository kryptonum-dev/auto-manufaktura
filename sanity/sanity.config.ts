import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { muxInput } from 'sanity-plugin-mux-input';
import { structure } from './structure';
import { schemaTypes, singletonActions, singletonTypes } from './structure/schema-types';

export default defineConfig({
  name: 'default',
  title: 'Auto Manufaktura',

  projectId: 't3kupl3a',
  dataset: 'production',

  plugins: [structureTool({ structure }), media(), visionTool(), muxInput({ encoding_tier: 'baseline' })],

  schema: {
    types: schemaTypes,
    templates: templates => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
