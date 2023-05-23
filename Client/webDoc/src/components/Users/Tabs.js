import React, { useEffect, useState } from "react";

const Tabs = ({ getStatus }) => {
  const [tabs, setTabs] = useState([
    { id: 1, status: "completed" },
    { id: 2, status: "incompleted" },
  ]);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    getStatus(activeTab);
  }, [activeTab, getStatus]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="sm:hidden relative w-11/12 mx-auto bg-white rounded">
        <select
          aria-label="Selected tab"
          className="form-select block w-full p-3 border border-gray-300 rounded text-gray-600 appearance-none bg-transparent relative z-10"
          value={activeTab.id}
          onChange={(e) => {
            const selectedTab = tabs.find(
              (tab) => tab.id === Number(e.target.value)
            );
            setActiveTab(selectedTab);
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id} className="text-sm text-gray-600">
              {tab.status}
            </option>
          ))}
        </select>
      </div>
      <div className="xl:w-full xl:mx-0 h-12 hidden sm:block bg-white shadow rounded">
        <ul className="flex border-b px-5">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={
                activeTab.id === tab.id
                  ? "text-sm border-blue-700 pt-3 rounded-t text-blue-700 mr-12"
                  : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-blue-700 cursor-pointer"
              }
            >
              <div className="flex items-center mb-3">
                <span className="ml-1 font-normal">{tab.status}</span>
              </div>
              {activeTab.id === tab.id && (
                <div className="w-full h-1 bg-blue-700 rounded-t-md" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
