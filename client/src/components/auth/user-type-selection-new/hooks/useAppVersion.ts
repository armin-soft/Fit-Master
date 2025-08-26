
import { useAppVersionContext } from "@/contexts/AppVersionContext";

export const useAppVersion = () => {
  const { version } = useAppVersionContext();
  return version;
};
