
export interface TrainerProfile {
  name: string;
  bio: string;
  phone: string;
  image: string;
  gymName: string;
  gymDescription: string;
  gymAddress: string;
  instagram: string;
  website: string;
}

export const defaultProfile: TrainerProfile = {
  name: "",
  bio: "",
  phone: "",
  image: "/Assets/Image/Place-Holder.svg",
  gymName: "",
  gymDescription: "",
  gymAddress: "",
  instagram: "",
  website: ""
};

// Helper function to ensure all profile fields have valid string values
export const normalizeProfile = (profile: any): TrainerProfile => ({
  name: profile?.name || "",
  bio: profile?.bio || "",
  phone: profile?.phone || "",
  image: profile?.image || "/Assets/Image/Place-Holder.svg",
  gymName: profile?.gymName || "",
  gymDescription: profile?.gymDescription || "",
  gymAddress: profile?.gymAddress || "",
  instagram: profile?.instagram || "",
  website: profile?.website || ""
});
