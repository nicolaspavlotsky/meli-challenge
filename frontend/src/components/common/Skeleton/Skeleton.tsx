import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  height?: number;
}

const Skeleton = ({ height = 180 }: SkeletonProps) => {
  return <div className={styles.skeleton} style={{ height }}></div>;
};

export default Skeleton;
