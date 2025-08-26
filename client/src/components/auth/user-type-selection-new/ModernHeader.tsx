
import React from "react";
import { HeaderLogo } from "./header/HeaderLogo";
import { HeaderTitle } from "./header/HeaderTitle";
import { HeaderStatus } from "./header/HeaderStatus";
import { HeaderDivider } from "./header/HeaderDivider";

export const ModernHeader = () => {
  return (
    <div className="text-center px-4 sm:px-6 lg:px-8" dir="rtl">
      <HeaderLogo />
      <HeaderTitle />
      <HeaderStatus />
      <HeaderDivider />
    </div>
  );
};
