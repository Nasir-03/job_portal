import { useState } from 'react';
import AboutTab from './AboutTab';
import JobsTab from './JobsTab';
import EmployeesTab from './EmployeesTab';

const CompanyTabs = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="mt-6">
      <div className="flex gap-6 border-b border-gray-600 mb-4">
        {['about', 'jobs', 'employees'].map(tab => (
          <button
            key={tab}
            className={`pb-2 px-4 text-lg font-medium ${
              activeTab === tab ? 'text-bright-sun-400 border-b-2 border-bright-sun-400' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="text-gray-300">
        {activeTab === 'about' && <AboutTab />}
        {activeTab === 'jobs' && <JobsTab />}
        {activeTab === 'employees' && <EmployeesTab />}
      </div>
    </div>
  );
};

export default CompanyTabs;