import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const diagnosticQuestions = [
  {
    id: 1,
    domain: 'LLM Fundamentals',
    level: 'Foundation',
    question: 'An LLM generates text by:',
    options: [
      'Searching its training database for matching patterns',
      'Predicting the most statistically likely next token',
      'Following programmed rules about grammar and logic',
      'Connecting to the internet to find current information'
    ],
    correct: 1,
    explanation: 'LLMs use statistical prediction to generate the next most likely token based on training data.'
  },
  {
    id: 2,
    domain: 'LLM Fundamentals',
    level: 'Application',
    question: "You're building a contract analysis tool. Your LLM sometimes fabricates clause interpretations. The most effective immediate fix is:",
    options: [
      'Increase temperature for more creative responses',
      'Switch to a larger, more powerful model',
      'Implement retrieval-augmented generation with contract text',
      'Fine-tune the model on legal documents'
    ],
    correct: 2,
    explanation: 'RAG directly addresses hallucination by grounding responses in actual contract text.'
  },
  {
    id: 3,
    domain: 'Prompt Engineering',
    level: 'Foundation',
    question: 'Which prompt component typically has the greatest impact on output quality?',
    options: [
      'Polite phrasing ("please," "thank you")',
      'Clear task specification with examples',
      'Length of the prompt',
      'Model temperature setting'
    ],
    correct: 1,
    explanation: 'Clear task specification with examples (few-shot learning) has the most significant impact on quality.'
  },
  {
    id: 4,
    domain: 'Agentic Systems',
    level: 'Foundation',
    question: 'An "agentic" AI system differs from a standard LLM chatbot by:',
    options: [
      'Using a more powerful underlying model',
      'Having the ability to take actions and use tools autonomously',
      'Being more polite and conversational',
      'Having memory of previous conversations'
    ],
    correct: 1,
    explanation: 'Agency means the ability to take actions and use tools autonomously.'
  },
  {
    id: 5,
    domain: 'RAG & Knowledge',
    level: 'Foundation',
    question: 'Retrieval-Augmented Generation (RAG) improves LLM outputs by:',
    options: [
      'Training the model on more data',
      'Retrieving relevant information to include in the prompt context',
      'Generating multiple responses and choosing the best one',
      "Increasing the model's parameter count"
    ],
    correct: 1,
    explanation: 'RAG retrieves relevant information at inference time to include in context.'
  },
  {
    id: 6,
    domain: 'Strategic AI',
    level: 'Foundation',
    question: 'The primary reason most AI projects fail in enterprises:',
    options: [
      'Insufficient computing power',
      'Poor model accuracy',
      'Lack of clear business value or organizational alignment',
      'Wrong algorithm selection'
    ],
    correct: 2,
    explanation: 'AI failure is usually strategic/organizational rather than technical.'
  }
];

const courseCatalog = {
  'llm-fundamentals': {
    id: 'llm-fundamentals',
    domain: 'LLM Fundamentals',
    description: 'How language models work—not just surface prompting',
    tracks: {
      foundation​​​​​​​​​​​​​​​​
