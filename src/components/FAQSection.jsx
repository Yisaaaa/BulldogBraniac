import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <div className="bg-[#fb923c] text-white pb-48">
      <main className="max-w-screen-xl mx-auto py-5 h-full relative">
        <h2 className="text-4xl font-extrabold mb-24">FAQs</h2>
        <div id="faq" className="w-3/4 mx-auto">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl">
                What is BulldogBraniac?
              </AccordionTrigger>
              <AccordionContent className="w-3/4 text-lg font-medium">
                BulldogBraniac is an interactive platform designed to help
                students review and reinforce their knowledge through quizzes.
                It provides a personalized learning experience by highlighting
                areas where you need improvement.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-2xl">
                How does BulldogBraniac work?
              </AccordionTrigger>
              <AccordionContent className="w-3/4 text-lg font-medium">
                Simply paste your notes or a link of a web article you want to
                review, and BulldogBraniac will generate a series of quizzes
                tailored to your learning needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-2xl">
                Is it free?
              </AccordionTrigger>
              <AccordionContent className="w-3/4 text-lg font-medium">
                Yes, BulldogBraniac is absolutely free to use with all features
                included.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-2xl">
                Can I use QuizReviewApp on my mobile device?
              </AccordionTrigger>
              <AccordionContent className="w-3/4 text-lg font-medium">
                Unfortunately, the web version is not yet available.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default FAQSection;
