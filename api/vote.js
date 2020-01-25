const admin = require("firebase-admin")
const users = require("./_users.json")

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
  databaseURL: "https://cpinfo19-poll.firebaseio.com",
})

module.exports = async (request, response) => {
  const { email, github, vote } = request.body

  if (email === undefined || github === undefined) {
    console.log(`Ignoring ${request.body}`)
    return response.status(401).send("Unauthorized")
  }

  if (
    users.find(
      user =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.github.toLowerCase() === github.toLowerCase()
    ) === undefined
  ) {
    return response.status(401).send("Unauthorized")
  }

  const voteId = `${email.toLowerCase()}_${github.toLowerCase()}`
  const voteData = {
    hackathon: vote === "hackathon",
    exam: vote === "exam",
  }

  console.log(voteId, voteData)

  try {
    await admin
      .firestore()
      .collection("poll-final-2019")
      .doc(voteId)
      .set(voteData)

    response.status(200).send()
  } catch (error) {
    response.status(500).send(error.stack)
  }
}
