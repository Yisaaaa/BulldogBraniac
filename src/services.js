import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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

const generateQuizFromUrl = async (url) => {
  const prompt = `Im going to give you an article and your job is to make a multiple choice quiz out of it. Produce at least 10 items if possible. Your output should be in a json format. You may not include any other data like title and description. Just focus on the questions. Don't inlude any other text because I will be using JSON.parse() method to convert your output directly into json like adding a json text at the very top.

  Follow this json schema like this:
[
  {
      question: "question here",
      options: ["a", "b", "and so on"],
      answer: "correct answer from options"
  }
]

 Im prone to having error especially after these lines:
     const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
  
    When I try to run JSON.parse(text), im getting this error: SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data

  I suspect that it is because when I print the text, I get something like:

  '''json
  data...
  '''
  
  Here is the link:${url}`;

  try {
    return await generateQuiz(prompt);
  } catch (e) {
    throw e;
  }
};

const generateQuizFromNotes = async (notes) => {
  const prompt = `Im going to give you an article and your job is to make a multiple choice quiz out of it. Produce at least 10 items if possible. Your output should be in a json format. You may not include any other data like title and description. Just focus on the questions. Don't inlude any other text because I will be using JSON.parse() method to convert your output directly into json like adding a json text at the very top.

  Follow this json schema like this:
[
  {
      question: "question here",
      options: ["a", "b", "and so on"],
      answer: "correct answer from options"
  }
]

 Im prone to having error especially after these lines:
     const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
  
    When I try to run JSON.parse(text), im getting this error: SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data

  I suspect that it is because when I print the text, I get something like:

  '''json
  data...
  '''

  Here is the notes: ${notes}`;

  try {
    return await generateQuiz(prompt);
  } catch (e) {
    throw e;
  }
};

const generateQuiz = async (prompt) => {
  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/'''json/g, "").trim();
    console.log(cleanedText);
    return JSON.parse(cleanedText);
  } catch (e) {
    throw e;
  }
};

const writeQuizToDb = async (quiz, user, dispatch) => {
  // setDoc
  console.log("writing to db: ", quiz);
  try {
    const docRef = await addDoc(collection(db, "quizzes"), {
      ...quiz,
    });
    console.log("Document written with ID: ", docRef.id);

    // Updating quiz id
    await updateDoc(docRef, { id: docRef.id });

    // Updating user myQuizzes
    const userRef = doc(db, `users/${quiz.userId}`);
    await updateDoc(userRef, { myQuizzes: [...user.myQuizzes, docRef.id] });

    return (await getDoc(doc(db, `quizzes/${docRef.id}`))).data();
  } catch (e) {
    console.log("error saving data to db: ", e);
  }
};

const updateUserWithField = async (field, userId) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, field);
};

export const updateRecentlyTakenQuizzes = async (
  recentQuiz,
  recentQuizzes,
  userId
) => {
  let newRecentQuizzes = [
    recentQuiz,
    ...recentQuizzes.filter((quiz) => quiz.id !== recentQuiz.id),
  ];
  console.log(newRecentQuizzes);

  if (newRecentQuizzes.length === 4) {
    newRecentQuizzes = newRecentQuizzes.slice(0, -1);
  }

  const newRecentQuizzesModified = [
    recentQuiz.id,
    ...newRecentQuizzes
      .filter((quiz) => quiz.id !== recentQuiz.id)
      .map((quiz) => quiz.id),
  ];

  await updateUserWithField(
    { recentQuizzes: newRecentQuizzesModified },
    userId
  );

  return newRecentQuizzes;
};

export {
  fetchQuizzes,
  fetchPublicQuizzes,
  generateQuiz,
  generateQuizFromUrl,
  generateQuizFromNotes,
  writeQuizToDb,
};
