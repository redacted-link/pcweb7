import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image} from "react-bootstrap";
import SiteNav from "../templates/SiteNav";
import {addDoc, collection} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth,db } from "../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function FeedbackPage() {
  const [user,loading]= useAuthState(auth);
  const [feedback, setFeedback] = useState("");
//   const [image, setImage] = useState("");
//   const [previewImage, setPreviewImage]= useState("https://picsum.photos/id/10/600");
//   const [imageName, setImageName]= useState("")
  const navigate= useNavigate();

  async function addPost() {
    // const imageReference= ref(storage, `images/${image.name}`);
    // const response= await uploadBytes(imageReference,image);
    // const imageUrl= await getDownloadURL(response.ref);
    await addDoc(collection(db, "feedback"), {feedback: feedback});
    navigate("/")
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [navigate,user,loading]);

  return (
    <>
      <SiteNav />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Feedback</h1>
        <Form>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={feedback}
              onChange={(text) => setFeedback(text.target.value)}
            />
            <Form.Text className="text-muted">
              We greatly value any feedback.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={async (e) => addPost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
