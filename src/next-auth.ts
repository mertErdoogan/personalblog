import { Profile as NextAuthProfile } from "next-auth";

interface ProviderProfile extends NextAuthProfile {
  id?: string; // GitHub kullanıcı ID'si
  avatar_url?: string; // Profil resmi URL'si
  name?: string; // Kullanıcı adı
  email?: string; // E-posta
  at_hash?: string;
}

export default ProviderProfile;