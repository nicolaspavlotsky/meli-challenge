import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";
import { CgChevronRight } from "react-icons/cg";
import React from "react";

interface BreadcrumbsProps {
  breadcrumbs: {
    label: string;
    link?: string;
  }[];
  useLinkColor?: boolean;
}

const Breadcrumbs = ({ breadcrumbs, useLinkColor }: BreadcrumbsProps) => {
  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          <Link
            to={breadcrumb.link ?? "#"}
            className={`${styles.link} ${useLinkColor ? styles.linkColor : ""}`}
          >
            {breadcrumb.label}
          </Link>
          {index !== breadcrumbs.length - 1 && (
            <CgChevronRight className={styles.icon} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
