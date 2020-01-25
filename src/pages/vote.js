import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap"
import axios from "axios"

const Vote = () => {
  const [alert, setAlert] = useState({})
  const submitForm = async event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const urlData = new URLSearchParams(formData)

    try {
      await axios.put("/api/vote", urlData)
      setAlert({
        visible: true,
        success: true,
        message: "Your vote was counted.",
      })
    } catch (error) {
      console.log(error)
      setAlert({
        visible: true,
        success: false,
        message: error.response.data,
      })
    }
  }

  console.log("ALERT:", alert)

  return (
    <Layout>
      <SEO title="Vote" />
      <Row>
        <Col>
          <Alert
            isOpen={alert.visible === true}
            color={alert.success ? "success" : "danger"}
            toggle={() => setAlert({ ...alert, visible: false })}
          >
            {alert.message}
          </Alert>
          <Form onSubmit={submitForm}>
            <FormGroup row>
              <Label for="email" sm={2}>
                gmail
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@gmail.com"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="github" sm={2}>
                github
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="github"
                  id="github"
                  placeholder="username"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup tag="fieldset" row>
              <Col sm={{ size: 10, offset: 2 }}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="vote"
                      value="hackathon"
                      required
                    />{" "}
                    I vote for a <strong>Hackathon</strong>
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="vote" value="exam" /> I vote for
                    an <strong>Exam</strong>
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button color="primary">Vote!</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Layout>
  )
}

export default Vote
