import React from "react";
import CertificateList from "components/certificate/user/CertificateList";

const CertificateListPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
        <CertificateList />
      </div>
    );
};

export default CertificateListPage;