"use client"

import { store } from "@/store";
import { Provider } from "react-redux";
import FormModal from "./FormModal";


export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider store={store}>
        {children}
        <FormModal />
      </Provider>
    </>
  );
};
