import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Form from "react-bootstrap/Form";
import Columns from "react-columns";
import axios from "axios";

const App = () => {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState([]);
  useEffect(() => {
    axios
      .all([
        axios.get("https://disease.sh/v3/covid-19/all"),
        axios.get("https://disease.sh/v3/covid-19/countries"),
      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
        // console.log(responseArr[1].data);
      })
      .catch((err) => console.log(err));
  }, []);
  const num = new Intl.NumberFormat("en");
  const date = new Date(parseInt(latest.updated));
  const latestUpdated = date.toDateString();
  //   console.log(latestUpdated);
  const filterCountry = results.filter((item) => {
    return searchCountry !== ""
      ? item.country.toLowerCase().includes(searchCountry)
      : item;
  });

  const countries = filterCountry.map((data, i) => {
    return (
      <Card id="card" key={i} bg="light" text="dark" style={{ margin: 10 }}>
        <Card.Img
          variant="top"
          src={data.countryInfo.flag}
          style={{ height: "190px" }}
        />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text className="data-container">
            <span>Cases: </span>
            <span>{num.format(data.cases)}</span>
          </Card.Text>
          <Card.Text className="data-container">
            <span>Deaths: </span>
            <span>{num.format(data.deaths)}</span>
          </Card.Text>
          <Card.Text className="data-container">
            <span>Recovered: </span>
            <span>{num.format(data.recovered)}</span>
          </Card.Text>
          <Card.Text className="data-container">
            <span>Today's Cases: </span>
            <span>{num.format(data.todayCases)}</span>
          </Card.Text>
          <Card.Text className="data-container">
            <span>Today's Deaths: </span>
            <span>{num.format(data.todayDeaths)}</span>
          </Card.Text>
          <Card.Text className="data-container">
            <span>Active: </span>
            <span>{num.format(data.active)}</span>
          </Card.Text>
          <Card.Text className="data-container">
            <span>Critical: </span>
            <span>{num.format(data.critical)}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });

  var queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 4,
      query: "min-width: 1025px",
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="App">
        <CardDeck>
          <Card bg="dark" text="light">
            <Card.Body>
              <Card.Title>Total Cases</Card.Title>
              <Card.Text>{num.format(latest.cases)}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small>
                Last updated on <strong>{latestUpdated}</strong>
              </small>
            </Card.Footer>
          </Card>
          <Card bg="danger" text="light">
            <Card.Body>
              <Card.Title>Total Deaths</Card.Title>
              <Card.Text>{num.format(latest.deaths)}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small>
                Last updated <strong>{latestUpdated}</strong>
              </small>
            </Card.Footer>
          </Card>
          <Card bg="success" text="light">
            <Card.Body>
              <Card.Title>Total Recovered</Card.Title>
              <Card.Text>{num.format(latest.recovered)}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small>
                Last updated <strong>{latestUpdated}</strong>
              </small>
            </Card.Footer>
          </Card>
        </CardDeck>

        <Form className="form-container">
          <Form.Group controlId="formGroupSearch">
            <Form.Control
              onChange={(e) => setSearchCountry(e.target.value.toLowerCase())}
              type="text"
              placeholder="Search by country"
            />
          </Form.Group>
        </Form>

        <Columns queries={queries}>{countries}</Columns>
      </div>
    </div>
  );
};

export default App;
