
import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useDeviceInfo } from '@/hooks/use-mobile';

interface StudentSearchControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClearSearch: () => void;
}

const StudentSearchControls: React.FC<StudentSearchControlsProps> = ({
  searchQuery,
  setSearchQuery,
  handleClearSearch
}) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <div className="flex items-center gap-2 sm:gap-3 mt-2 md:mt-0">
      {searchQuery && (
        <Button 
          variant="outline" 
          size={deviceInfo.isMobile ? "sm" : "icon"}
          onClick={handleClearSearch}
          className={deviceInfo.isMobile ? "h-8 w-8" : "h-10 w-10 flex-shrink-0"}
        >
          <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`${deviceInfo.isMobile ? 'w-full' : 'w-full md:w-80'}`}
      >
        <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 p-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="جستجوی شاگردان..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border-none focus:outline-none focus:ring-0"
            />
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentSearchControls;
