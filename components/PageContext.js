import React, { useContext, useState } from "react";

export const PageContext = React.createContext();
const PageUpdateContext = React.createContext()

export function usePage() {
  return useContext(PageContext)
}

export function usePageUpdate() {
  return useContext(PageUpdateContext)
}

function PageProvider({ children }) {

  const [page, setPage] = useState('musicplayer')

  function setPageToShow(newPage) {
    setPage(newPage)
  }

  return (
    <PageContext.Provider value={page}>
      <PageUpdateContext.Provider value={setPageToShow}>
        {console.log("Page in provider is", page)}
        {children}
      </PageUpdateContext.Provider>
    </PageContext.Provider>
  )
}

export default PageProvider;
