import React, { useEffect, useState } from "react";
import { Button, Container, Form , Image} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import SiteNav from "../templates/SiteNav";
import {updateDoc, doc, getDoc} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth,db} from "../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export default function EditProfilePage() {
//   const params = useParams();
//   const id = params.id;
  const [id,setId] = useState("")
  const [image, setImage] = useState("");
  const navigate=useNavigate();
  const [user,loading]= useAuthState(auth);
  const [previewImage, setPreviewImage]=useState("https://picsum.photos/id/10/600");

  async function updatePost() {
    // const imageReference= ref(storage, `images/${image.name}`);
    // const response = await uploadBytes(imageReference, image);
    // const imageUrl= await getDownloadURL(response.ref)                  
    await updateDoc(doc(db, "userprof", id), {image  });
    navigate("/");
  }

  async function getUser(useremail) {
    const postDocument= await getDoc(doc(db, "userprof", useremail));
    const post = postDocument.data();
    setImage(post.image);
    setPreviewImage(post.image);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getUser(user.email);
    setId(user.email);
  }, [loading,navigate,user]);

  return (
    <div>
      <SiteNav />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Edit User Profile</h1>
        <p style={{ marginBlock: "1rem" }}>Preview of you own profile picture(Placeholder is your profile picture):</p>
        <Form>
          <Image 
           src={previewImage}
           style= {{objectFit: "cover",
             width: "10rem",
             height: "10rem"}}/>                           
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image URL for Profile Picture</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://picsum.photos/id/10/600"
              onChange={(text) => {
                // const imageFile= e.target.files[0]
                // const previewImage= URL.createObjectURL(imageFile);
                setImage(text.target.value);
                setPreviewImage(text.target.value)

              }}
            />  
            <Form.Text className="text-muted">
              Make sure the url has a image type at the end: jpg, jpeg, png.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={(e) => updatePost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}