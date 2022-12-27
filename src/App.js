import React from "react"
import './App.css';
import { auth, db } from "./firebase/init"
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged, 
  } from "firebase/auth";

function App() {

  const[user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true)

  async function updatePost(){
    const hardId = "ejCEVGT6dY13k5BTeIx7"
    const postRef = doc(db, "posts", hardId)
    const post = await getPostById(hardId)
    const newPost = {
      ...post,
      title: "Become an alien mage",
    }
    updateDoc(postRef,newPost)
  }

  function deletePost(){
    const hardId = "ejCEVGT6dY13k5BTeIx7"
    const postRef = doc(db, "posts", hardId)
    deleteDoc(postRef);
  }

  function createPost(){
    const post = {
      title: "Be a fish",
      description: "Breathe water",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts(){
    const {docs} = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
    console.log(posts)
  }

  async function getPostById(id){
    const postRef = doc(db, "posts", id)
    const postSnap = await getDoc(postRef)
    return postSnap.data();
  }

  async function getPostByUid(){
    const postCollectionRef = await query(
      collection(db,"posts"),
      where("uid", "==", user.uid)
    );
    const {docs} = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()))
  }


  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      console.log(user)
      if(user){
        setUser(user)
      }
    })
  }, []);

  function register(email,password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function login(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
      console.log(user)
      setUser(user)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  function logout(){
    signOut(auth)
    setUser({})
  }


  return (
    <div className="App">
      <button onClick={() => register("email@gmail.com", "test123")}>Register</button>
      <button onClick={() => login("email@gmail.com", "test123")}>Login</button>
      {loading ? "loading..." : user.email}
      <button onClick={logout}>Log out</button>
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Post</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}
//TODO:
//NAV barg with login button and register button hard code values.
//When loged in click the circl;e to log out
//SKELETON LOADING STATE

export default App;
