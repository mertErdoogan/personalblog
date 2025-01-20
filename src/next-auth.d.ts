import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // Ek alan
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface NextAuthProfile {
    id: string; // GitHub kullanıcı ID'si
    avatar_url?: string; // Profil resmi URL'si
    name?: string; // Kullanıcı adı
    email?: string; // E-posta
    at_hash?: string;
  }
}