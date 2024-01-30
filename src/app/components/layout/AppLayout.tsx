// AppLayout.jsx
import React from 'react';
import ToastContainerComponent from '../ToastContainerComponents';

const AppLayout = ({ children }: any ) => {
  return (
    <>
      <ToastContainerComponent />
      {children}
    </>
  );
};

export default AppLayout;
