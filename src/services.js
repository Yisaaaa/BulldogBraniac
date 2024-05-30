import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const fetchQuizzes = async (quizIds) => {
  const temp = await Promise.all(
    quizIds.map(async (quiz) => {
      const quizRef = doc(db, `quizzes/${quiz}`);
      const data = await getDoc(quizRef);
      return data.data();
    })
  );
  console.log(temp);
  return temp;
};

export { fetchQuizzes };
