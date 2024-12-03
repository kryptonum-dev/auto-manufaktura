import Button from './Button';
export default Button;
export type { ButtonDataTypes, ButtonTypes } from './Button.types';

export const ButtonDataQuery = (name: string) => /* groq */ `
  ${name} {
    text,
    theme,
    linkType,
    "href": select(linkType == "internal" => internal -> slug.current, linkType == "external" => external, "#")
  },
`;
