
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { TrainerProfileContainer } from "./trainer/components/TrainerProfileContainer";
import { TrainerProfileBackground } from "./trainer/components/TrainerProfileBackground";
import { useTrainerProfile } from "./trainer/hooks/useTrainerProfile";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const TrainerProfile = () => {
  useDocumentTitle('پروفایل مربی');
  
  const profileData = useTrainerProfile();

  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen relative overflow-hidden">
      <TrainerProfileBackground />
      
      <motion.div 
        className="relative z-10 min-h-screen flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <TrainerProfileContainer {...profileData} />
      </motion.div>
    </PageContainer>
  );
};

export default TrainerProfile;
