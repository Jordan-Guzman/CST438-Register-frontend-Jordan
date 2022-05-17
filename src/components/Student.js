import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Semester from './Semester';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, course:{ } };
    };

    handleClickOpen = () => {
        this.setState( {open:true} );
    };

    handleAdd = () => {
        this.handleClose();
    }
  
    handleClose = () => {
        this.setState( {open:false} );
    };

    // handleChange = (event) => {
    //     this.setState({student:{student_id: event.target.value}});
    // }

    render() {
        return (
            <React.Fragment>
                <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
                    Add Student
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>New Student</DialogTitle>
                    <DialogContent  style={{paddingTop: 20}} >
                        <TextField autoFocus fullWidth label="Student Name" name="" onChange={this.handleChange}  /> 
                        <TextField fullWidth label="Student Email" name="" onChange={this.handleChange}  /> 
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button color="primary" onClick={this.handleAdd}>Add</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default Student;