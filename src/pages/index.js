import React, { useState, useEffect } from "react"
import firebase from "firebase/app"
import "firebase/firestore"
import { Row, Col, Progress, Badge } from "reactstrap"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIZ_2K-7u7jhJc522JQ3M5xf0z9p-ptgE",
  authDomain: "cpinfo19-poll.firebaseapp.com",
  databaseURL: "https://cpinfo19-poll.firebaseio.com",
  projectId: "cpinfo19-poll",
  storageBucket: "cpinfo19-poll.appspot.com",
  messagingSenderId: "556405914006",
  appId: "1:556405914006:web:2664b594a6dda2320905b7",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const Poll = () => {
  const [results, setResults] = useState({ hackathon: 0, exam: 0 })
  useEffect(() => {
    return firebase
      .firestore()
      .collection("poll-final-2019")
      .onSnapshot(onNext, onError)

    function onNext(snapshot) {
      const data = snapshot.docs.map(d => d.data())
      const hackathon = data.filter(d => d.hackathon === true).length
      const exam = data.filter(d => d.exam === true).length
      setResults({
        hackathon,
        exam,
      })
    }

    function onError(error) {
      console.error(error)
    }
  }, [])

  console.log(results)
  const { hackathon, exam } = results
  const hackathonPercent =
    hackathon > 0 ? Math.round((hackathon * 100) / (hackathon + exam)) : 0
  const examPercent =
    exam > 0 ? Math.round((exam * 100) / (hackathon + exam)) : 0

  const colorHackathon = "primary"
  const colorExam = "success"

  return (
    <Layout>
      <SEO title="Results" />
      <Row>
        <Col xs={12} className="text-center">
          <h1 className="display-4">
            Votes Counted:{" "}
            <span className="text-danger">{hackathon + exam}</span>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>
            <Badge color={colorHackathon} pill>
              {hackathon}
            </Badge>{" "}
            Hackathon
          </h3>
        </Col>
        <Col className="text-right">
          <h3>
            Exam{" "}
            <Badge color={colorExam} pill>
              {exam}
            </Badge>
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Progress multi style={{ height: "8em" }}>
            <Progress
              bar
              animated
              color={colorHackathon}
              value={hackathonPercent}
            >
              <h3>Hackathon</h3>
            </Progress>
            <Progress bar animated color={colorExam} value={examPercent}>
              <h3>Exam</h3>
            </Progress>
          </Progress>
        </Col>
      </Row>
    </Layout>
  )
}

export default Poll
