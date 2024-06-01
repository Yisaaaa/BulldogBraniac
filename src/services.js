import { collection, doc, getDoc, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { GoogleGenerativeAI } from "@google/generative-ai";

const fetchQuizzes = async (quizIds) => {
  const temp = await Promise.all(
    quizIds.map(async (quiz) => {
      const quizRef = doc(db, `quizzes/${quiz}`);
      let data = (await getDoc(quizRef)).data();

      const userRef = doc(db, `users/${data.userId}`);
      data.user = (await getDoc(userRef)).data();
      return data;
    })
  );
  return temp;
};

const fetchPublicQuizzes = async (userId) => {
  const snapshot = await getDocs(collection(db, "quizzes"));

  const temp = [];

  snapshot.forEach(async (quiz) => {
    let data = quiz.data();

    if (data.userId !== userId) {
      temp.push(data);
    }
  });

  await Promise.all(temp);

  await Promise.all(
    temp.map(async (quiz) => {
      const userRef = doc(db, `users/${quiz.userId}`);
      quiz.user = (await getDoc(userRef)).data();
    })
  );
  return temp;
};

const generateQuizFromUrl = async (url, setLoading, setError, setStep) => {
  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

  const prompt = `Im going to give you an article and your job is to make a multiple choice quiz out of it. Produce at least 10 items if possible. Your output should be in a json format. You may not include any other data like title and description. Just focus on the questions. Don't inlude any other text because I will be using JSON.parse() method to convert your output directly into json like adding a json text at the very top.

  Follow this json schema like this:
[
  {
      question: "question here",
      options: ["a", "b", "and so on"],
      answer: "correct answer from options"
  }
]
  
  Here is the link:${url}`;
  setLoading(true);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setLoading(false);
    console.log(text);
    setStep(0);
    return JSON.parse(text);
  } catch (e) {
    setError("Error generating quiz");
    setLoading(false);
    console.log("Error generating quiz");
    console.log(e);
  }
};

const writeQuizToDb = async (quiz) => {
  // setDoc
  console.log("writing to db: ", quiz);
  try {
    const docRef = await addDoc(collection(db, "quizzes"), {
      ...quiz,
    });
    console.log("Document written with ID: ", docRef.id);
    console.log(docRef);
  } catch (e) {
    console.log("error saving data to db: ", e);
  }
};

export { fetchQuizzes, fetchPublicQuizzes, generateQuizFromUrl, writeQuizToDb };
