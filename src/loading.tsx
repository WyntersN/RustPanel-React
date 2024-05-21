
import styles from './styles/loading.less'
export default () => {
  return (
    <div className={styles.global_loading_body}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};
