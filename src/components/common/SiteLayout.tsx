"use client"

import { store } from "@/store";
import { Provider } from "react-redux";
import FormModal from "./FormModal";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"
import NavMenu from "./NavMenu";


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
          <div className="py-2">
            <NavMenu />
          </div>
          {children}
          <FormModal />
        </Provider>
      </SessionProvider>
    </>
  );
};
