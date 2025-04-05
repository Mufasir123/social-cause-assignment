"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContentVideos from "@/components/ContentVideos";
import { MdSlowMotionVideo } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";

const questions = [
  {
    id: 1,
    question: "What type of social issue matters most to you?",
    options: ["Climate Change", "Poverty & Hunger", "Education", "Human Rights"],
  },
  {
    id: 2,
    question: "How do you prefer to contribute?",
    options: ["Volunteering", "Donating", "Raising Awareness", "Policy Advocacy"],
  },
  {
    id: 3,
    question: "What motivates you to take action?",
    options: ["Inspiring Stories", "Scientific Research", "Community Support", "Personal Experience"],
  },
];

const FindYourPassion = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [recommendedCategory, setRecommendedCategory] = useState(null);

  const handleNext = (option) => {
    const updatedAnswers = { ...answers, [questions[step].id]: option };
    setAnswers(updatedAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateMatch(updatedAnswers);
    }
  };

  const calculateMatch = (answers) => {
    const categories = {
      "Climate Change": ["Climate Change"],
      "Education": ["Education"],
      "Human Rights": ["Human Rights"],
      "Poverty & Hunger": ["Poverty & Hunger"],
    };
    
    let bestMatch = "General";
    let maxScore = 0;
    Object.keys(categories).forEach((category) => {
      let score = 0;
      categories[category].forEach((topic) => {
        if (Object.values(answers).includes(topic)) {
          score += 1;
        }
      });
      if (score > maxScore) {
        maxScore = score;
        bestMatch = category;
      }
    });
    
    setRecommendedCategory(bestMatch);
    setMatchPercentage((maxScore / questions.length) * 100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <AnimatePresence mode="wait">
        {step < questions.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h2 className="text-xl font-bold mb-4">{questions[step].question}</h2>
            <div className="flex flex-col gap-3">
              {questions[step].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleNext(option)}
                  className="bg-gray-800 text-white hover:bg-gray-600 p-3 rounded-lg"
                >
                  {option}
                </Button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold">✨ Your Passion is Found! ✨</h2>
            <p className="mt-4">Based on your answers, you have a <span className="text-green-400 font-bold">{matchPercentage}% match</span> with <span className="text-yellow-400 font-bold">{recommendedCategory} Content</span>.</p>
            <p className="mt-4">Explore recommended content below:</p>
            <ContentLibrary category={recommendedCategory} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContentLibrary = ({ category }) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Recommended Content for {category}</h3>
      <ContentVideos category={category} />
    </div>
  );
};

export default FindYourPassion;
