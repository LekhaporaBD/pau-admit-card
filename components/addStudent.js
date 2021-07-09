import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddStudentModel from './addSutdentModel/addSutdentModel'


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top:'40%',
    left: '35%',
    transform : `translate(-${40}%, -${45}%)`
  },
}));

export default function SimpleModal({openModal , setOpenModal }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(openModal);


  const handleClose = () => {
    setOpen(false);
    setOpenModal(false);
  };

  const body = (
    <div className={classes.paper}>
      <AddStudentModel handleClose={handleClose}  />
    </div>
  );

  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
