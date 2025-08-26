
import { useAppVersionContext } from "@/contexts/AppVersionContext";

export const useAppVersion = () => {
  const { version, isLoading } = useAppVersionContext();
  return { version, isLoading };
};
