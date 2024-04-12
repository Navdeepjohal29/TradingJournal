import React, {useState} from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Signup = () => {
    const [name, setName]=useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setconfirmPassword]= useState('');
    const [confirmPasswordError, setconfirmPasswordError]=useState('');
    const [phone, setPhone]= useState('');
  // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


    const handleName =(e) =>{
        setName(e.target.value);
        setSubmitted(false);
    }
    const handleEmail =(e) =>{
        setEmail(e.target.value);
        setSubmitted(false);
    }

    const handlePassword = (e) => {
        const newPassword = e.target.value;
      
        if (passwordRegex.test(newPassword)) {
          // Password is valid
          setPassword(newPassword);
          setPasswordError('');
        } else {
          // Password is not valid
          setPasswordError('Invalid password format');
        }

      };
      const handleConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
    
        if (password === confirmPassword) {
          // Passwords match
          setconfirmPassword(confirmPassword);
          setconfirmPasswordError('');
        } else {
          // Passwords do not match
          setconfirmPasswordError('Passwords do not match');
        }
      };
    const handlePhone =(e) =>{
        setPhone(e.target.value);
        setSubmitted(false);
    }
  
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (name === '' || email ===''  || phone === '' || password === '' ||  confirmPassword === '' ){
            setError(true);

        }
        else{
            setSubmitted(true);
            setError(false);
        }
    }
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>User {name} successfully registered!!</h1>
            </div>
        );
    };
 
    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>

            </div>
        );
    };
 
    return (
        <div>
           <Container>
            <Row>
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>
            <Form  className='col-md-6 m-auto'>
                <Form.Group className="mb-3" controlId="formGroupEmail" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={handleName} type="name" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleEmail} type="email" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text"  
                onChange={handlePassword}  placeholder="" />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPhone" >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control  type="password"  onChange={handleConfirmPassword} placeholder="" />
                    {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPhone" >
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number"  onChange={handlePhone} placeholder="" />
                </Form.Group>
             
                <Button onClick={handleSubmit} className="btn"
                        type="submit" variant="primary">Submit</Button>
            </Form>
            </Row>
            </Container> 

        </div>
    );
}

export default Signup;