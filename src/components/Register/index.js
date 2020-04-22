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
  Image,
  Heading
} from "grommet";
import { Book } from "grommet-icons";
import axios from "axios";
import { string } from "prop-types";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [bookingPeriod, setBookingPeriod] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingPeriodDisable, setBookingPeriodDisable] = useState([]);
  const [workshopList, setWorkshopList] = useState([]);
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [companyErr, setCompanyErr] = useState("");
  const [notebookErr, setNotebookErr] = useState("");
  const [bookingErr, setBookingErr] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);
  const [options, setOptions] = useState([
    "Grommet",
    "RedFish API",
    "Simplivity API",
    "Nimble API",
    "Oneview API"
  ]);
  const [workshopDesc, setWorkshopDesc] = useState([]);
  const [formIsValid, setFormIsValid] = useState(true);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  const sendEmail = `${apiEndpoint}/api/sendmail`;
  const getWorkshops = `${apiEndpoint}/api/workshops`;
  const addCustomer = `${apiEndpoint}/api/customer/create`;

  useEffect(() => {
    axios({
      method: "GET",
      url: getWorkshops
    }).then(response => {
      let arrName = [];
      let arrDesc = [];
      response.data.forEach(workshop => {
        arrName.push(workshop.name);
        arrDesc.push(workshop.description);
      });
      if (arrName.length > 0) setOptions(arrName);
      setWorkshopDesc(arrDesc);
    });

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
  }, []);

  // Escaping regular expression special characters: [ \ ^ $ . | ? * + ( )
  const getEscapedText = text => text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");

  // Create the regular expression with escaped special characters.
  const formatSearchExpression = text => {
    return new RegExp(getEscapedText(text), "i");
  };

  const onSearch = text => {
    const exp = formatSearchExpression(text);
    setOptions(options.filter(option => exp.test(option)));
  };

  const nameValidation = name => {
    //Name - only letters and space
    if (name) {
      if (!name.match(/^[a-zA-Z\s]+$/)) {
        setFormIsValid(false);
        setNameErr("Only letters and space");
      } else {
        setFormIsValid(true);
        setNameErr("");
      }
    } else {
      setFormIsValid(false);
      setNameErr("Please enter your name");
    }
  };
  const companyValidation = company => {
    //Company - only letters and space
    if (company) {
      if (!company.match(/^[a-zA-Z\s]+$/)) {
        setFormIsValid(false);
        setCompanyErr("Only letters and space");
      } else {
        setFormIsValid(true);
        setCompanyErr("");
      }
    } else {
      setFormIsValid(false);
      setCompanyErr("Please enter your company name");
    }
  };
  const emailValidation = email => {
    //Email
    if (email) {
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
        setFormIsValid(false);
        setEmailErr("Email is not valid");
      } else {
        setFormIsValid(true);
        setEmailErr("");
      }
    } else {
      setFormIsValid(false);
      setEmailErr("Please enter your company email");
    }
  };
  const workshopValidation = workshopList => {
    //Notebooks List - required
    if (Array.isArray(workshopList) && workshopList.length) {
      setFormIsValid(true);
      setNotebookErr("");
    } else {
      setFormIsValid(false);
      setNotebookErr("Please select a workshop");
    }
  };
  const bookingPeriodValidation = bookingPeriod => {
    //Booking Period - required
    if (typeof bookingPeriod === "string" && bookingPeriod) {
      setBookingErr("");
      setStartDate(bookingPeriod);
    } else if (Array.isArray(bookingPeriod) && bookingPeriod.length) {
      setBookingErr("");
      setStartDate(bookingPeriod[0][0]);
      setEndDate(bookingPeriod[0][1]);
    } else {
      setFormIsValid(false);
      setBookingErr("Please select booking period");
    }
  };

  const handleValidation = () => {
    setFormIsValid(true);
    //Notebooks List - required
    workshopValidation(workshopList);
    //Booking Period - required
    bookingPeriodValidation(bookingPeriod);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    handleValidation();
    if (formIsValid) {
      axios({
        method: "POST",
        url: addCustomer,
        data: {
          name,
          email,
          company,
          workshopList,
          startDate,
          endDate
        }
      }).then(response => {
        console.log("response", response);
        if (response.status >= 400) {
          return setSubmitStatus(false);
        }
        setSubmitStatus(true);
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
        <Heading level="4">Register for Workshops</Heading>
        <Form onSubmit={handleSubmit}>
          <FormField label="Name" error={nameErr}>
            <TextInput
              size="large"
              type="text"
              required={true}
              placeholder="enter your name"
              value={name}
              onChange={event => {
                nameValidation(event.target.value);
                setName(event.target.value);
              }}
            />
          </FormField>
          <FormField label="Company" error={companyErr}>
            <TextInput
              type="text"
              required={true}
              placeholder="enter your company name"
              value={company}
              onChange={event => {
                companyValidation(event.target.value);
                setCompany(event.target.value);
              }}
            />
          </FormField>
          <FormField label="Email" error={emailErr}>
            <TextInput
              type="text"
              required={true}
              placeholder="enter your company email"
              value={email}
              onChange={event => {
                emailValidation(event.target.value);
                setEmail(event.target.value);
              }}
            />
          </FormField>
          <FormField label="Workshops" error={notebookErr}>
            <Select
              options={options}
              placeholder="select a workshop(s)"
              //searchPlaceholder="Search workshops"
              //onSearch={text => onSearch(text)}
              icon={<Book />}
              closeOnChange={false}
              multiple={true}
              value={workshopList}
              onChange={event => {
                workshopValidation(event.value);
                setWorkshopList(event.value);
              }}
              messages={{ multiple: workshopList.join(",") }}
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
              onSelect={event => {
                bookingPeriodValidation(event);
                setBookingPeriod(event);
              }}
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
            state: { name, email, company, startDate, endDate, workshopList }
          }}
        />
      )}
    </Box>
  );
}

export default Register;
