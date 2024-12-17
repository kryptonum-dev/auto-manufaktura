import type { ListingTypes } from './Listing.types';
import styles from './Listing.module.scss';

export default function Listing({}: ListingTypes) {
  return <section className={styles['Listing']}>LISTING</section>;
}
