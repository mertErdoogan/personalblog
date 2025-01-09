"use client"

import { store } from "@/store";
import { Provider } from "react-redux";
import FormModal from "./FormModal";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"


export default function SiteLayout({
  session,
  children,
}: {
  session: Session | null
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          {children}
          <FormModal />
        </Provider>
      </SessionProvider>
    </>
  );
};
