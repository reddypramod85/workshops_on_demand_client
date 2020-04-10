import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Box,
  Form,
  FormField,
  TextInput,
  Select,
  Button,
  Calendar,
  Image
} from "grommet";
import { Book } from "grommet-icons";
import axios from "axios";
//import dotenv from "dotenv";
//import PropTypes from "prop-types";

//========================================= Register
const options = [
  "Grommet",
  "Nimble",
  "OneView",
  "Simplivity",
  "RedFish",
  "HPE Container Platform",
  "Aruba",
  "Cray",
  "Scytale",
  "Green Lake"
];

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [bookingPeriod, setBookingPeriod] = useState("");
  const [bookingPeriodDisable, setBookingPeriodDisable] = useState([]);
  const [notebookList, setNotebookList] = useState([]);
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [companyErr, setCompanyErr] = useState("");
  const [notebookErr, setNotebookErr] = useState("");
  const [bookingErr, setBookingErr] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);

  //dotenv.config();

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  const sendEmail = `${apiEndpoint}/sendmail`;

  useEffect(() => {
    // code to run on component mount
    const blockPreviousDates = () => {
      var today = new Date(),
        todaysDate =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          (today.getDate() - 1);

      const startdate = ["2000-01-01"];
      startdate.push(todaysDate);
      bookingPeriodDisable.push(startdate);
      setBookingPeriodDisable(bookingPeriodDisable);
    };
    blockPreviousDates();
  });

  const handleValidation = () => {
    let formIsValid = true;

    //Name - only letters
    if (typeof name !== "undefined") {
      if (!name.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        setNameErr("Only letters");
      } else {
        setNameErr("");
      }
    }

    //Company - only letters and spaces
    if (typeof company !== "undefined") {
      if (!company.match(/^[a-zA-Z\s]+$/)) {
        formIsValid = false;
        setCompanyErr("Only letters and space");
      } else {
        setCompanyErr("");
      }
    }

    //Email
    if (typeof email !== "undefined") {
      const emailtemp = email;
      let lastAtPos = emailtemp.lastIndexOf("@");
      let lastDotPos = emailtemp.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          emailtemp.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          emailtemp.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        setEmailErr("Email is not valid");
      } else {
        setEmailErr("");
      }
    }

    //Notebooks List - required
    if (typeof notebookList !== "undefined") {
      if (notebookList === null || notebookList === "") {
        formIsValid = false;
        setNotebookErr("Please fill out this field");
      } else {
        setNotebookErr("");
      }
    }

    //Booking Period - required
    if (typeof bookingPeriod !== "undefined") {
      if (bookingPeriod === null || bookingPeriod === "") {
        formIsValid = false;
        setBookingErr("Please select booking period");
      } else {
        setBookingErr("");
      }
    }

    return formIsValid;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (handleValidation()) {
      axios({
        method: "POST",
        url: sendEmail,
        data: {
          name,
          email,
          company,
          notebookList,
          bookingPeriod
        }
      }).then(response => {
        if (response.data === "success") {
          setSubmitStatus(true);
        } else if (response.data === "fail") {
          setSubmitStatus(true);
        }
      });
    }
  };

  return (
    <Box
      align="center"
      justify="between"
      direction="row-responsive"
      background={{ color: "background-front" }}
      wrap={false}
      overflow="auto"
      fill="horizontal"
      flex="grow"
      pad="large"
    >
      <Box
        align="stretch"
        justify="start"
        fill={true}
        direction="column"
        pad="xsmall"
        flex={true}
      >
        <Form onSubmit={handleSubmit}>
          <FormField label="Name" error={nameErr}>
            <TextInput
              size="large"
              type="text"
              required={true}
              placeholder="enter your name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </FormField>
          <FormField label="Company" error={companyErr}>
            <TextInput
              type="text"
              required={true}
              placeholder="enter your company name"
              value={company}
              onChange={event => setCompany(event.target.value)}
            />
          </FormField>
          <FormField label="Email" error={emailErr}>
            <TextInput
              type="text"
              required={true}
              placeholder="enter your company email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </FormField>
          <FormField label="Workshops" error={notebookErr}>
            <Select
              options={options}
              //required={true}
              placeholder="select a workshop(s)"
              icon={<Book />}
              closeOnChange={false}
              multiple={true}
              value={notebookList}
              onChange={event => setNotebookList(event.value)}
              messages={{ multiple: notebookList.join(",") }}
            />
          </FormField>
          <FormField label="Booking period" error={bookingErr}>
            <Calendar
              daysOfWeek={true}
              range={true}
              size="small"
              required={true}
              disabled={bookingPeriodDisable}
              animate={false}
              value={bookingPeriod}
              onSelect={event => setBookingPeriod(event)}
            />
          </FormField>
          <Box
            align="start"
            justify="center"
            direction="row-responsive"
            gap="medium"
            pad="small"
          >
            <Button
              label="Submit"
              type="submit"
              hoverIndicator={true}
              primary={true}
              reverse={false}
              active={false}
            />
          </Box>
        </Form>
      </Box>
      <Box
        align="center"
        justify="center"
        direction="column"
        fill={true}
        flex={true}
        round="medium"
      >
        <Image src="/img/gremlin-rockin.svg" />
      </Box>
      {submitStatus && (
        <Redirect
          to={{
            pathname: "/success",
            state: { name, email, company, bookingPeriod, notebookList }
          }}
        />
      )}
    </Box>
  );
}

export default Register;
