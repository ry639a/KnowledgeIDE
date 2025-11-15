import React, { ReactNode } from "react";

interface TabPanelProps {
  children: ReactNode;
  label?: string;
  value?: number;
  index?: number;
  className?: string;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  label,
  value,
  index,
  className = "",
}) => {
  // Optional logic: only render content if the selected tab matches index
  if (value !== undefined && index !== undefined && value !== index) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      aria-labelledby={label}
      className={`tab-panel ${className}`}
    >
      {children}
    </div>
  );
};

export default TabPanel;
