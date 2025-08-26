
import { performBuildOperations } from '../operations/buildOperations';

export const copyFilesPlugin = () => {
  return {
    name: 'copy-files',
    closeBundle: async () => {
      await performBuildOperations();
    },
  };
};
