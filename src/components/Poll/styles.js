import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    
  },
  paper2: {
    marginTop: theme.spacing(8),
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor:'#eeeeee',
  },
  paperJoin: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor:'#e1e6da',
    height: 300,
  },
  
  // form: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'center',
  // },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginTop: 20,
    marginBottom: 0,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '8px',
    width:350,
    height: 26  ,
    position: 'relative',
    padding:3,
    marginTop: theme.spacing(18),
  },
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: '#272525c7',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   padding: theme.spacing(2),
  //   backgroundColor:'#eeeeee'
  // },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(3),
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  table:{
    backgroundColor:'#eeeeee',
  },
  join:{
    marginLeft:'12px',
    backgroundColor:'#00800085',
    '&:hover': {
      backgroundColor:'#008000b5'
    }
  },
  joinLocked:{
    marginLeft:'12px',
    backgroundColor:'#db9696dc',    
    '&:hover': {
      backgroundColor:'#e24242a3'
    }
  },
  tableRow:{
    backgroundColor:'#e3e7eedc',

  }
}));
