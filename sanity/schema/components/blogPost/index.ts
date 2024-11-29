import { PortableText } from '../../ui/portable-text';

import Image from './Image';

export default PortableText({
  name: 'content',
  title: 'Zawartość artykułu',
  allowHeadings: true,
  useCustomInput: false,
  components: [Image],
});
