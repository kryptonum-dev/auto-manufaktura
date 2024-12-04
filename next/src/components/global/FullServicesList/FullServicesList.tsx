import TextBlock from '@/components/ui/TextBlock';
import ServiceCard from '@/components/ui/ServiceCard';
import type { FullServicesListTypes } from './FullServicesList.types';
import styles from './FullServicesList.module.scss';

export default function FullServicesList({ index, heading, highlightedService, services }: FullServicesListTypes) {
  const Tag = index === 0 ? 'h2' : 'h3';

  return (
    <section className={`${styles['FullServicesList']} max-width`}>
      <header>
        <TextBlock
          tag={index === 0 ? 'h1' : 'h2'}
          value={heading}
          className='heading-xl'
        />
      </header>
      <div className={styles.content}>
        <div className={styles.column}>
          <TextBlock
            tag={Tag}
            value={highlightedService.heading}
            className='text-xl'
          />
          <ServiceCard
            {...highlightedService.service}
            size='large'
            label={highlightedService.label}
            imagePriority={index === 0}
          />
        </div>
        {services.map(service => (
          <div
            className={styles.column}
            key={service.name}
          >
            <Tag className='text-xl'>{service.name}</Tag>
            <ServiceCard
              {...service}
              size='large'
              className={styles.mainService}
            />
            <div className={styles.list}>
              {service.list.map(item => (
                <ServiceCard
                  key={item.name}
                  {...item}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
