import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const fetchQuizzes = async (quizIds) => {
  const temp = await Promise.all(
    quizIds.map(async (quiz) => {
      const quizRef = doc(db, `quizzes/${quiz}`);
      const data = await getDoc(quizRef);
      return data.data();
    })
  );
  return temp;
};

const fetchPublicQuizzes = async (userId) => {
  const snapshot = await getDocs(collection(db, "quizzes"));

  const temp = [];

  snapshot.forEach((quiz) => {
    const data = quiz.data();

    if (data.userId !== userId) {
      temp.push(data);
    }
  });

  await Promise.all(temp);
  return temp;
};

export { fetchQuizzes, fetchPublicQuizzes };
