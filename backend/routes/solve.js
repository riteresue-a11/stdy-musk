const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate progressive hints based on subject
 */
function generatePrompt(question, subject) {
  const prompts = {
    english: `You are a helpful English tutor. A student asked: "${question}"

Please provide the answer in the following JSON format:
{
  "answer": "the complete answer as a single word or short phrase",
  "steps": ["hint1", "hint2", "hint3", "hint4"]
}

For the "steps" array:
- Step 1: Give the first letter only
- Step 2: Give the first 2 letters
- Step 3: Give the first 3 letters (or more if needed)
- Step 4: Give the complete answer

If the answer is a phrase, treat it as a whole for progressive revelation.`,

    social: `You are a helpful Social Studies tutor. A student asked: "${question}"

Please provide the answer in the following JSON format:
{
  "answer": "the complete answer",
  "steps": [
    "broad category or hint",
    "more specific hint with some details",
    "detailed explanation with most information",
    "complete answer with full explanation"
  ]
}

The steps should progressively reveal the answer from general to specific.`,

    science: `You are a helpful Science tutor. A student asked: "${question}"

Please provide the answer in the following JSON format:
{
  "answer": "the complete answer",
  "steps": [
    "general category or concept",
    "key principle or formula",
    "detailed explanation",
    "complete answer with reasoning"
  ]
}

The steps should progressively build understanding from basic concept to full answer.`
  };

  return prompts[subject] || prompts.english;
}

/**
 * POST /api/solve/text
 * Solve a text-based question
 */
router.post('/text', async (req, res) => {
  try {
    const { question, subject } = req.body;

    if (!question || !subject) {
      return res.status(400).json({ 
        error: 'Missing required fields: question and subject' 
      });
    }

    if (!['english', 'social', 'science'].includes(subject)) {
      return res.status(400).json({ 
        error: 'Invalid subject. Must be: english, social, or science' 
      });
    }

    // Generate prompt based on subject
    const prompt = generatePrompt(question, subject);

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    let parsedResponse;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
      parsedResponse = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      // Fallback: create a simple progressive response
      parsedResponse = {
        answer: text.trim().substring(0, 100),
        steps: [
          'Analyzing your question...',
          'Processing information...',
          'Preparing answer...',
          text.trim()
        ]
      };
    }

    res.json({
      success: true,
      subject,
      question,
      ...parsedResponse
    });

  } catch (error) {
    console.error('Error solving question:', error);
    res.status(500).json({ 
      error: 'Failed to solve question',
      message: error.message 
    });
  }
});

/**
 * POST /api/solve/image
 * Solve a question from an image
 */
router.post('/image', async (req, res) => {
  try {
    const { imageData, subject } = req.body;

    if (!imageData || !subject) {
      return res.status(400).json({ 
        error: 'Missing required fields: imageData and subject' 
      });
    }

    // Extract base64 data
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');

    // First, extract text from image
    const visionModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg'
        }
      }
    ];

    const extractPrompt = 'Extract all text from this image. If it contains a question, write the complete question. If it contains study material, transcribe all visible text.';
    
    const extractResult = await visionModel.generateContent([extractPrompt, ...imageParts]);
    const extractResponse = await extractResult.response;
    const extractedText = extractResponse.text();

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Could not extract text from image. Please try a clearer image.' 
      });
    }

    // Now solve the extracted question
    const prompt = generatePrompt(extractedText, subject);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    let parsedResponse;
    try {
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
      parsedResponse = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      parsedResponse = {
        answer: text.trim().substring(0, 100),
        steps: [
          'Analyzing your question...',
          'Processing information...',
          'Preparing answer...',
          text.trim()
        ]
      };
    }

    res.json({
      success: true,
      subject,
      extractedText,
      ...parsedResponse
    });

  } catch (error) {
    console.error('Error solving image question:', error);
    res.status(500).json({ 
      error: 'Failed to solve image question',
      message: error.message 
    });
  }
});

module.exports = router;
