"use client";
import React, { ReactNode } from "react";
import styles from "./a4-sheet.module.css";

interface A4SheetProps {
  children: ReactNode;
}

const A4Sheet: React.FC<A4SheetProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.a4Sheet}>{children}</div>
    </div>
  );
};

export default A4Sheet;
