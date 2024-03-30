import { ReactNode } from "react";
import styles from "./dashboardCard.module.scss";

const DashboardCard = ({ children }: { children: ReactNode }) => {

  return (
    <div className={styles.dashboardCardContainer}>
      {children}
    </div>
  );
};

export default DashboardCard;