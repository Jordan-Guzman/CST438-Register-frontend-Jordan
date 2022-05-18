import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Semester from './Semester';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddStudent from './AddStudent';

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = { students: [] };
    };
    
    componentDidMount() {
        this.fetchStudents();
    }
      
    fetchStudents = () => {
        console.log("Student.fetchStudents");
        const token = Cookies.get('XSRF-TOKEN');
        
        fetch(`${SERVER_URL}/student?id=${this.props.location.id}`, 
            {  
            method: 'GET', 
            headers: { 'X-XSRF-TOKEN': token }
            } )
        .then((response) => {
            console.log("FETCH RESP:"+response);
            return response.json();}) 
        .then((responseData) => { 
            // do a sanity check on response
            if (Array.isArray(responseData.students)) {
            this.setState({ 
                students: responseData.students,
            });
            } else {
            toast.error("Fetch failed.", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            }        
        })
        .catch(err => {
            toast.error("Fetch failed.", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err); 
        })
    }
    
      render() {
         const columns = [
          { field: 'student_id', headerName: 'Student_ID', width: 400 },
          { field: 'name', headerName: 'Name', width: 125 },
          { field: 'email', headerName: 'Email', width: 200 },
          {
            field: 'id',
            headerName: '  ',
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ marginLeft: 16 }} 
                  onClick={()=>{this.onDelClick(params.value)}}
                >
                  Drop
                </Button>
            )
          }
          ];
      
      return(
          <div>
              <AppBar position="static" color="default">
                <Toolbar>
                   <Typography variant="h6" color="inherit">
                      { 'Student ' + this.props.location.name + ' ' + this.props.location.email }
                    </Typography>
                </Toolbar>
              </AppBar>
              <div className="App">
                <div style={{width:'100%'}}>
                    For DEBUG:  display state.
                    {JSON.stringify(this.state)}
                </div>
                <Grid container>
                  <Grid item>
                      <AddStudent addStudent={this.addStudent}  />
                  </Grid>
                </Grid>
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid rows={this.state.students} columns={columns} />
                </div>
                <ToastContainer autoClose={1500} />   
              </div>
          </div>
          ); 
      }
}

export default Student;

// Have status set to 0 by default upon creation of a new Student
// Do this in eclipse backend code