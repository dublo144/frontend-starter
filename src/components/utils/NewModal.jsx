import React from 'react';
import { Modal } from 'semantic-ui-react';

const NewModal = ({
  children,
  trigger = null,
  open,
  handleCloseModal,
  headerMessage
}) => {
  return (
    <Modal trigger={trigger} closeIcon open={open} onClose={handleCloseModal}>
      <Modal.Header>{headerMessage}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default NewModal;
