import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import YearComboBox from "../YearCombobox";
import SubjectComboBox from "../SubjectCombobox";

function CreateQuizDialog({ step, setStep }) {
  const [firstStepIsOpen, setFirstStepIsOpen] = useState(false);
  const [secondStepIsOpen, setSecondStepIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [quizInfo, setQuizInfo] = useState({
    title: "",
    yearLevel: "",
    subject: "",
  });

  useEffect(() => {
    if (step == 1) {
      setFirstStepIsOpen(true);
    } else if (step == 2) {
      setFirstStepIsOpen(false);
      setSecondStepIsOpen(true);
    }
  }, [step]);

  console.log(quizInfo);

  const handleFirstSubmit = (e) => {
    if (!quizInfo.title || !quizInfo.yearLevel || !quizInfo.subject) {
      console.log("fill in all fields");
      setError("Please fill in all fields!");
    } else {
      setError("");
      setStep(2);
    }
  };

  if (firstStepIsOpen) {
    return (
      <Dialog
        open={firstStepIsOpen}
        onOpenChange={(value) => {
          setStep(0);
          setFirstStepIsOpen(value);
        }}
      >
        <DialogContent className="bg-white max-w-xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-4xl">Create a quiz</DialogTitle>
          </DialogHeader>
          <div className="px-1 mb-3">
            {error && (
              <div className="bg-red-300 py-1 rounded-lg border-2 border-red-600 mb-4">
                <p className="text-lg text-center font-semibold text-red-500 ">
                  {error}
                </p>
              </div>
            )}
            <form className=" flex flex-col gap-4" onSubmit={handleFirstSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="font-semibold text-lg">
                  Quiz name
                </label>
                <input
                  className="border-[1px] border-[#aaa] rounded-md px-2 py-1 text-lg"
                  id="title"
                  type="text"
                  onChange={(e) => {
                    setQuizInfo((prev) => ({ ...prev, title: e.target.value }));
                  }}
                  value={quizInfo.title}
                  placeholder="Enter your quiz name here..."
                />
              </div>
              <YearComboBox
                value={quizInfo.yearLevel}
                setValue={(value) =>
                  setQuizInfo((prev) => ({ ...prev, yearLevel: value }))
                }
              />
              <SubjectComboBox
                value={quizInfo.subject}
                setValue={(value) =>
                  setQuizInfo((prev) => ({ ...prev, subject: value }))
                }
              />
            </form>
          </div>
          <DialogFooter>
            <button
              onClick={handleFirstSubmit}
              className="bg-primary rounded-full mx-auto w-full py-2 font-semibold text-white hover:bg-[#c2410c] transition-colors duration-300 text-lg"
            >
              Save changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  } else if (secondStepIsOpen) {
    return (
      <Dialog
        open={secondStepIsOpen}
        onOpenChange={(value) => {
          setStep(0);
          setSecondStepIsOpen(value);
        }}
      >
        <DialogContent className="bg-white max-w-xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-4xl">Create a quiz</DialogTitle>
          </DialogHeader>
          <div className="px-1 mb-3">
            {error && (
              <div className="bg-red-300 py-1 rounded-lg border-2 border-red-600 mb-4">
                <p className="text-lg text-center font-semibold text-red-500 ">
                  {error}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <button
              onClick={handleFirstSubmit}
              className="bg-primary rounded-full mx-auto w-full py-2 font-semibold text-white hover:bg-[#c2410c] transition-colors duration-300 text-lg"
            >
              Save changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}

export default CreateQuizDialog;
