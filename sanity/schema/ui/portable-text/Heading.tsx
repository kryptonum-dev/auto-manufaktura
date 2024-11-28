import { defineArrayMember, defineType } from 'sanity';
import { CustomInput } from './CustomInput';

export default defineType({
  name: 'Heading',
  type: 'array',
  title: 'Nagłówek',
  components: {
    // @ts-ignore
    input: CustomInput,
  },
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normalny', value: 'normal' }],
      lists: [],
      marks: {
        annotations: [],
        decorators: [{ title: 'Pogrubienie', value: 'strong' }],
      },
    }),
  ],
});
