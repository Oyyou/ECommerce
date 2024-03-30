import { AuthGuard } from "components";
import { DashboardCard, QuickAccess } from "routes/admin/components";
import styles from "./dashboard.module.scss";

const DashboardPage = () => {

  return (
    <AuthGuard>
      <div className={styles.dashboardContainer}>
        <h2>Dashboard</h2>
        {[
          QuickAccess,
        ].map((Component, i) => (
          <DashboardCard key={i}>
            <Component />
          </DashboardCard>
        ))}
      </div>
    </AuthGuard>
  );
};

export default DashboardPage;