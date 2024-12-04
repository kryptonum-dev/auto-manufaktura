import TextBlock from '@/components/ui/TextBlock';
import ServiceCard from '@/components/ui/ServiceCard';
import type { SelectedServicesListTypes } from './SelectedServicesList.types';
import styles from './SelectedServicesList.module.scss';

export default function SelectedServicesList({
  index,
  heading,
  paragraph,
  highlightedService,
  services,
}: SelectedServicesListTypes) {
  return (
    <section className={`${styles['SelectedServicesList']} max-width`}>
      <header>
        <TextBlock
          tag={index === 0 ? 'h1' : 'h2'}
          value={heading}
          className='heading-2xl'
        />
        {paragraph && <TextBlock value={paragraph} />}
      </header>
      <div className={styles.content}>
        {highlightedService && (
          <ServiceCard
            {...highlightedService}
            size='large'
            imagePriority={index === 0}
          />
        )}
        {services.map(service => (
          <ServiceCard
            key={service.name}
            {...service}
            size='large'
            imagePriority={index === 0 && !highlightedService}
          />
        ))}
      </div>
    </section>
  );
}
