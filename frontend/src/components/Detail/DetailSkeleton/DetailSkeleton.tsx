import Skeleton from "@/components/common/Skeleton/Skeleton";
import styles from "./DetailSkeleton.module.scss";
import useWindowSize from "@/hooks/useWindowSize";
import { BREAKPOINTS } from "@/constants/app";

const DetailSkeleton = () => {
  const windowSize = useWindowSize();

  return (
    <div className={styles.skeleton}>
      <div className={styles.top}>
        <Skeleton height={windowSize > BREAKPOINTS.md ? 400 : 200} />
        <Skeleton height={windowSize > BREAKPOINTS.md ? 400 : 150} />
      </div>

      <div className={styles.bottom}>
        <Skeleton height={windowSize > BREAKPOINTS.md ? 300 : 150} />
      </div>
    </div>
  );
};

export default DetailSkeleton;
