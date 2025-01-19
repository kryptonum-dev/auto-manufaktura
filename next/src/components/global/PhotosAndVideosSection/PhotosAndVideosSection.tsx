'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TextBlock from '@/components/ui/TextBlock';
import Button from '@/components/ui/Button';
import Img from '@/components/ui/Img';
import type { VideoDataTypes } from '@/components/ui/Video';
import type { PhotosAndVideosSectionTypes } from './PhotosAndVideosSection.types';
import styles from './PhotosAndVideosSection.module.scss';

const VideoModal = dynamic(() => import('./_VideoModal'), { ssr: false });

export default function PhotosAndVideosSection({ index, breadcrumbs, sections }: PhotosAndVideosSectionTypes) {
  const [video, setVideo] = useState<VideoDataTypes | null>(null);

  return (
    <>
      {video && (
        <VideoModal
          video={video}
          setVideo={setVideo}
          closeIcon={<CloseIcon />}
        />
      )}
      <section
        className={`${styles['PhotosAndVideosSection']} max-width`}
        data-first={index === 0}
      >
        {breadcrumbs && (
          <Breadcrumbs
            data={breadcrumbs}
            className={styles.breadcrumbs}
          />
        )}
        <div className={styles.sections}>
          {sections.map(({ heading, paragraph, media, cta }, idx) => (
            <div
              key={idx}
              className={styles.section}
            >
              <header>
                <TextBlock
                  tag={index === 0 && idx === 0 ? 'h1' : 'h2'}
                  value={heading}
                  className='heading-xl'
                />
                {paragraph && (
                  <div className={styles.text}>
                    <TextBlock
                      value={paragraph}
                      bulletListClassName='list-check-round'
                      linkClassName='link'
                    />
                  </div>
                )}
                {cta && (
                  <Button
                    {...cta}
                    className={styles.button}
                  />
                )}
              </header>
              <div className={styles.list}>
                {media.map(({ title, subtitle, image, video }, i) => (
                  <div key={`item-${i}`}>
                    <div
                      className={styles.media}
                      data-video={!!video}
                    >
                      {video && (
                        <button
                          onClick={() => setVideo(video)}
                          aria-label='Odtwórz wideo'
                          className={styles.btn}
                        >
                          <div className={styles.play}>
                            <PlayIcon />
                          </div>
                        </button>
                      )}
                      <Img
                        data={image}
                        sizes='(min-width: 824px) 204px, (min-width: 663px) 24.74vw, 164px'
                        priority={index === 0 && idx === 0 && i === 0}
                      />
                    </div>
                    <span className='text-m'>{title}</span>
                    {subtitle && <span className='text-m light'>{subtitle}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const CloseIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={12}
    height={12}
    viewBox='0 0 12 12'
    fill='none'
    {...props}
  >
    <path
      stroke='#CBD0D0'
      strokeLinecap='round'
      d='M9 3 3 9m0-6 6 6'
    />
  </svg>
);

const PlayIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={13}
    height={13}
    viewBox='0 0 13 13'
    fill='none'
    {...props}
  >
    <path
      fill='#FBFDFF'
      d='M11.204 4.967a1.499 1.499 0 0 1 0 2.647l-6.406 3.484c-1.03.56-2.298-.17-2.298-1.324V2.807c0-1.155 1.267-1.884 2.298-1.324l6.406 3.484Z'
    />
  </svg>
);
