import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [user, setUSer] = useState({name: '', age: ''});
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    console.log(user);
     if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age.",
      });
      return;
    }
    // The plus makes a conversion to a number like convertToInt.
    if (+user.age < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    // Sending object back to App.js
    props.onAddUser(user);
    //props.onAddUser(enteredName, enteredUserAge);

    // Resetting input fields.
    setUSer({name: '', age: ''});
    /*
    setEnteredUsername("");
    setEnteredAge("");
    nameInputRef.current.value = ''; // Normally don't use Ref's to change the value, only read from it!*/
  };

  const userChangeHandler = event => {
    const {value, name} = event.target;

      // Cleverly giving every input element the name attibute the exact same as the objecs property name so that
      // the objects prop 'name' corresponds to he input's name-attribute 'name', then using that to 
      // always get the correct property-name with [name]
    setUSer(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    })
  }

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {/* If error is not empty it will give us the second expression the <ErrorModal> object.*/}
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
          name="name"
            id="username"
            type="text"
            value={user.name}
            onChange={userChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age</label>
          <input
          name="age"
            id="age"
            type="number"
            value={user.age}
            onChange={userChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
