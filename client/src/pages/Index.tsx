
import React from "react";
import { UserTypeSelectionNew } from "@/components/auth/UserTypeSelection-New";

const Index = () => {
  console.log('Index: Rendering user type selection page as root');
  
  // صفحه اصلی همیشه صفحه انتخاب نوع ورود را نشان می‌دهد
  // App.tsx logic انتخاب نوع را handle می‌کند و redirect می‌کند
  return <UserTypeSelectionNew />;
};

export default Index;
