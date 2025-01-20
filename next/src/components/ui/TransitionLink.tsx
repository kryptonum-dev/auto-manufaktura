'use client';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

interface TransitionLinkTypes extends LinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function TransitionLink({ children, href, onClick, className = '', ...props }: TransitionLinkTypes) {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const pageTransition = document.querySelector('.page-transition') as HTMLDivElement;
    pageTransition?.classList.add('active');
    await wait(450);
    router.push(href);
    if (onClick) onClick(e);
    await wait(950);
    pageTransition?.classList.remove('active');
  };

  return (
    <Link
      href={href}
      onClick={handleTransition}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
