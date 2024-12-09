import { forwardRef } from 'react';

const Textarea = forwardRef((props, ref) => {
  const handleExpand = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = '4rem';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };

  return (
    <textarea
      onInput={handleExpand}
      ref={ref as React.Ref<HTMLTextAreaElement>}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
