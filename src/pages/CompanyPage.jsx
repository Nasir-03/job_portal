import React from "react";
import CompanyProfile from "../company/CompanyProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SimilarCompanies from "../company/SimilarCompanies";

const CompanyPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 pt-10 px-5 flex gap-10">
        <div className="w-2/3">
        <CompanyProfile />
        </div>
        <div className="w-[30%]">
            <SimilarCompanies />
        </div>
    </div>
  );
};

export default CompanyPage;
