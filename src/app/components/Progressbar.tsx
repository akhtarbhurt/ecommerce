'use client';

import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar'

const Progressbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="100px"
        color="#333"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};

export default Progressbar;
