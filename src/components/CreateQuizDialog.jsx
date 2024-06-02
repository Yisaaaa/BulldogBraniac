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
import YearComboBox from "./YearCombobox";
import SubjectComboBox from "./SubjectCombobox";
import { generateQuizFromUrl, writeQuizToDb } from "../services";
import LoadingSmall from "./LoadingSmall";
import { useDispatch, useSelector } from "react-redux";

function CreateQuizDialog({ step, setStep }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [firstStepIsOpen, setFirstStepIsOpen] = useState(false);
  const [secondStepIsOpen, setSecondStepIsOpen] = useState(false);
  const [webUrl, setWebUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [webOpen, setWebOpen] = useState(false);
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);
  const [quizInfo, setQuizInfo] = useState({
    userId: user.id,
    title: "",
    year: "",
    subject: "",
    content: [],
  });

  console.log(user);

  useEffect(() => {
    if (step === 1) {
      setFirstStepIsOpen(true);
    } else if (step === 2) {
      setFirstStepIsOpen(false);
      setSecondStepIsOpen(true);
    } else if (step === 3) {
      setSecondStepIsOpen(false);
    }
  }, [step]);

  console.log(quizInfo);
  console.log(step);

  const isUrlRegex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  const handleUrl = async () => {
    const url = webUrl;
    if (url.match(isUrlRegex)) {
      console.log("its a url");
      setWebUrl("");
      setError("");
      const content = await generateQuizFromUrl(
        url,
        setGenerating,
        setError,
        setStep
      );
      console.log(content);
      const newQuiz = await writeQuizToDb({ ...quizInfo, content }, user);
      setGenerating(false);
    } else {
      setError("Please paste in a url!");
    }
    // gemini(url)
  };

  const handleFirstSubmit = (e) => {
    if (!quizInfo.title || !quizInfo.year || !quizInfo.subject) {
      console.log("fill in all fields");
      setError("Please fill in all fields!");
    } else {
      setError("");
      setStep(2);
    }
  };

  const handleImportOption = (e) => {
    setError("");
    setStep(3);

    if (e.target.name === "web") {
      setWebOpen(true);
    } else if (e.target.name === "notes") {
      setNotesOpen(true);
    }
  };

  console.log(webOpen, notesOpen);

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
                value={quizInfo.year}
                setValue={(value) =>
                  setQuizInfo((prev) => ({ ...prev, year: value }))
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
              className="bg-primary rounded-full py-1 font-semibold text-white hover:bg-[#c2410c] transition-colors duration-300 text-lg px-4"
            >
              Confirm
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
            <DialogTitle className="text-3xl">
              Where is your quiz coming from?
            </DialogTitle>
          </DialogHeader>
          <div className="px-1 mb-3">
            {error && (
              <div className="bg-red-300 py-1 rounded-lg border-2 border-red-600 mb-4">
                <p className="text-lg text-center font-semibold text-red-500 ">
                  {error}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-6 w-1/2 mx-auto">
              <button
                name="web"
                onClick={handleImportOption}
                className="px-16 py-6 bg-primary text-xl font-semibold text-white rounded-lg drop-shadow-lg hover:bg-[#ea580c] transition-colors duration-300"
              >
                Web article
              </button>
              <button
                onClick={handleImportOption}
                name="notes"
                className="px-16 py-6 bg-primary text-xl font-semibold text-white rounded-lg drop-shadow-lg hover:bg-[#ea580c] transition-colors duration-300"
              >
                Notes
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  } else if (step === 3) {
    if (webOpen) {
      return (
        <Dialog
          open={webOpen}
          onOpenChange={(value) => {
            setStep(0);
            setWebOpen(value);
          }}
        >
          <DialogContent className="bg-white max-w-xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-3xl">Web article</DialogTitle>
            </DialogHeader>
            {generating ? (
              <LoadingSmall />
            ) : (
              <div className="px-1 mb-3">
                {error && (
                  <div className="bg-red-300 py-1 rounded-lg border-2 border-red-600 mb-4">
                    <p className="text-lg text-center font-semibold text-red-500 ">
                      {error}
                    </p>
                  </div>
                )}

                <form
                  className=" flex flex-col gap-4"
                  onSubmit={handleFirstSubmit}
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="webUrl" className="font-semibold text-lg">
                      Enter the url of the web article
                    </label>
                    <input
                      className="border-[1px] border-[#aaa] rounded-md px-2 py-1 text-lg"
                      id="webUrl"
                      type="text"
                      onChange={(e) => {
                        setWebUrl(e.target.value);
                      }}
                      value={webUrl}
                      placeholder="Paste the link here"
                    />
                  </div>
                </form>
              </div>
            )}
            <DialogFooter>
              <button
                onClick={handleUrl}
                className="bg-primary rounded-full py-1 font-semibold text-white hover:bg-[#c2410c] transition-colors duration-300 text-lg px-4"
              >
                Confirm
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    } else if (notesOpen) {
      return (
        <Dialog
          open={notesOpen}
          onOpenChange={(value) => {
            setStep(0);
            setWebOpen(value);
          }}
        >
          <DialogContent className="bg-white max-w-xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-3xl">
                Where is your quiz coming from?
              </DialogTitle>
            </DialogHeader>
            <div className="px-1 mb-3">
              {error && (
                <div className="bg-red-300 py-1 rounded-lg border-2 border-red-600 mb-4">
                  <p className="text-lg text-center font-semibold text-red-500 ">
                    {error}
                  </p>
                </div>
              )}

              <div>Notes</div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }
  }
}

export default CreateQuizDialog;
