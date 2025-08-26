
import React, { useEffect } from "react";
import { StudentHistory } from "@/components/students/history";
import { useStudents } from "@/hooks/students";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { useStudentRefresh } from "@/hooks/useStudentRefresh";
import { PageContainer } from "@/components/ui/page-container";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowLeft } from "lucide-react";

const StudentHistoryPage = () => {
  const { students } = useStudents();
  const { refreshTrigger } = useStudentRefresh();
  const { historyEntries, clearHistory } = useStudentHistory();

  // بروزرسانی تاریخچه هر زمان که تغییری در شاگردان ایجاد می‌شود
  useEffect(() => {
    console.log("History entries updated:", historyEntries.length);
  }, [historyEntries, refreshTrigger]);

  return (
    <PageContainer withBackground fullHeight className="w-full min-h-screen flex flex-col">
      <div className="w-full flex-1 flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        <div className="flex-shrink-0 mb-6">
          <PageHeader 
            title="تاریخچه شاگردان" 
            description={`نمایش سابقه تغییرات شاگردان (${historyEntries.length} مورد)`}
            actions={
              <Link to="/Management/Students">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>بازگشت به شاگردان</span>
                </Button>
              </Link>
            }
          />
        </div>
        
        <div className="flex-1 min-h-0">
          <StudentHistory 
            students={students}
            historyEntries={historyEntries}
            onClearHistory={clearHistory}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default StudentHistoryPage;
