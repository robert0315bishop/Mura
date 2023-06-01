// src/TabMenu.js

import React, { useState } from 'react';
import Jobs from './Jobs/Jobs';
import Faq from './Faq/Faq';
import Cafe from './Cafe/Cafe';

const tabs = ["Jobs", "FAQ", "News", "Cafe", "Dinner", "Bar"];
const Management = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="lg:mx-48 mx-6 lg:mt-24 mt-8 border border-black rounded-lg">
            <div className="flex border-b border-black">
                {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`py-1 lg:px-4 px-2 rounded-t-lg text-lg ${ activeTab === tab ? 'bg-blue-500 text-white' : "bg-[#F5ECE6] text-black" }`}
                >
                { tab }
                </button>
                ))}
            </div>
            <div>
            {tabs.map((tab) => (
                <div key={tab} className={`p-4 ${activeTab === tab ? 'block' : 'hidden'}`}>
                {(() => {
                    switch (tab) {
                        case "Jobs":
                            return <Jobs />;
                        case "FAQ":
                            return <Faq />
                        case "Cafe":
                            return <Cafe />
                        default:
                            return null;
                    }
                })()}
                </div>
            ))}
            </div>
        </div>
    );
};

export default Management;
