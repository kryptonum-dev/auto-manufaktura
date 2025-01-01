export type ChipTypes = {
  href?: string;
  scroll?: boolean;
  ['data-active']?: boolean;
  tag: 'label' | 'button' | 'a';
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.LabelHTMLAttributes<HTMLLabelElement>;
