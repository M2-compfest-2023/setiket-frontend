import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';
import Footer from '@/layouts/Footer';
import Navbar from '@/layouts/Navbar';
import useDialogStore from '@/store/useDialogStore';

type LayoutOpt = {
  children: React.ReactNode;
  withNavbar?: boolean;
  withFooter?: boolean;
} & React.ComponentPropsWithRef<'div'>;

export default function Layout({
  children,
  withNavbar = false,
  withFooter = false,
}: LayoutOpt) {
  //#region  //*=========== Store ===========
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();
  //#endregion  //*======== Store ===========

  return (
    <div>
      {withNavbar && <Navbar />}
      {children}
      <BaseDialog
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={open}
        options={state}
      />
      {withFooter && <Footer />}
    </div>
  );
}
