import { PortableText } from '../../ui/portable-text';

import Image from './Image';
import ListWithImages from './ListWithImages';
import Quote from './Quote';

export default PortableText({
  name: 'content',
  title: 'Zawartość artykułu',
  allowHeadings: true,
  useCustomInput: false,
  components: [Image, ListWithImages, Quote],
});
