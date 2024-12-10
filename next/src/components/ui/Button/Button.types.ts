export type ButtonTypes = {
  href?: string;
  linkType?: 'external' | 'internal';
  theme?: 'primary' | 'secondary' | 'tetriary';
  className?: string;
  restartIcon?: boolean;
} & ({ text: string | React.ReactNode; children?: never } | { text?: never; children: string | React.ReactNode }) &
  React.HTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonDataTypes = {
  href?: string;
  linkType?: 'external' | 'internal';
  theme?: 'primary' | 'secondary' | 'tetriary';
  text: string;
};
