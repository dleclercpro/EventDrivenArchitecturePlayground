import TestButton from '@/buttons/TestButton'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Test</p>
        <TestButton>Hello!</TestButton>
      </div>
    </main>
  )
}
