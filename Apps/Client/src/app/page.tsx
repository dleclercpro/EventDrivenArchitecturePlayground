import TestButton from '@/components/buttons/TestButton';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Home Page</p>
        <TestButton>Hello world!</TestButton>
      </div>
    </main>
  );
}
