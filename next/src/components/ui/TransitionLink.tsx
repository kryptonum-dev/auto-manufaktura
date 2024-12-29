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

export default function TransitionLink({ children, href, className = '', ...props }: TransitionLinkTypes) {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const pageTransition = document.querySelector('.page-transition') as HTMLDivElement;
    pageTransition?.classList.add('active');
    await wait(500);
    router.push(href);
    await wait(500);
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
