import React, { useState, ReactElement, ReactNode } from "react";
import "./Tabs.css";

interface TabPanelProps {
  label: string;
  children: ReactNode;
}

interface TabsProps {
  children: ReactElement<TabPanelProps>[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      {/* 🔹 Tab buttons */}
      <div className="tab-buttons">
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            className={`tab-button ${index === activeTab ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>

      {/* 🔹 Active tab content */}
      <div className="tab-content">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;
