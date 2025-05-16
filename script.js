// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Bounce animation for hero Ika-chan
    const ikaChanHero = document.getElementById('ika-chan-hero');
    if (ikaChanHero) {
        // Already has bounce class, animation set to infinite in CSS
    }

    // Quiz Logic
    const quizContainer = document.getElementById('quiz-container');
    const quizFeedback = document.getElementById('quiz-feedback');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const ikaChanQuizImg = document.getElementById('ika-chan-quiz');

    // New Ika-chan images for quiz feedback (placeholders)
    const ikaChanHappySrc = "https://i.postimg.cc/63mJhkkQ/Screenshot-2025-05-16-142032.jpg"; // Replace with actual happy image
    const ikaChanThinkingSrc = "https://i.postimg.cc/bvvgg7y4/Screenshot-2025-05-16-141057.jpg"; // Replace with actual thinking/oops image
    const ikaChanDefaultSrc = "https://i.postimg.cc/mrWdD1HX/Chat-GPT-Image-May-15-2025-10-44-04-AM.png";


    const questions = [
        {
            question: "What is a primary goal of Ika?",
            options: [
                { text: "To mine new cryptocurrencies", correct: false },
                { text: "To connect different blockchains securely (interoperability)", correct: true },
                { text: "To create NFTs exclusively", correct: false }
            ],
            feedbackCorrect: "Spot on! Ika-chan says: Ika connects blockchains so they can work together seamlessly! 🌟",
            feedbackWrong: "Not quite! Ika-chan says: Ika's main mission is to link up different blockchains. Give it another thought! 🤔"
        },
        {
            question: "What is a key feature of dWallets mentioned in the whitepaper?",
            options: [
                { text: "They only work with Bitcoin", correct: false },
                { text: "They can be programmed and transferred", correct: true },
                { text: "They store your passwords", correct: false }
            ],
            feedbackCorrect: "Awesome! Ika-chan says: dWallets are super flexible because they're programmable AND transferable! 💡",
            feedbackWrong: "Oops! Ika-chan reminds you: dWallets are special because you can program their logic and even transfer them! 😊"
        },
        {
            question: "What cryptographic protocol is central to Ika's security?",
            options: [
                { text: "Proof of Work", correct: false },
                { text: "The 2PC-MPC Protocol", correct: true },
                { text: "SHA-256 Hashing", correct: false }
            ],
            feedbackCorrect: "You got it! Ika-chan cheers: The 2PC-MPC protocol is the secret sauce for Ika's security! ✨",
            feedbackWrong: "Hmm, Ika-chan says: While important in crypto, the core of Ika's unique security is the 2PC-MPC protocol! 😉"
        },
        {
            question: "What consensus protocol does Ika use for its broadcast channel?",
            options: [
                { text: "Paxos", correct: false },
                { text: "Raft", correct: false },
                { text: "Mysticeti", correct: true }
            ],
            feedbackCorrect: "Excellent! Ika-chan nods: Mysticeti keeps Ika's communications fast and reliable! 💨",
            feedbackWrong: "Close, but no cigar! Ika-chan winks: Ika relies on Mysticeti for its speedy network messages! 👍"
        },
        {
            question: "What is one role of the IKA token in the ecosystem?",
            options: [
                { text: "To buy real-world items directly", correct: false },
                { text: "For staking and network governance", correct: true },
                { text: "To get customer support", correct: false }
            ],
            feedbackCorrect: "Well done! Ika-chan confirms: IKA tokens are key for staking to secure the network and for voting on its future! 🗳️",
            feedbackWrong: "Not exactly. Ika-chan explains: IKA tokens are mainly used for things like staking and participating in governance! 🧐"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion(index) {
        if (index >= questions.length) {
            showFinalScore();
            return;
        }

        const q = questions[index];
        quizContainer.innerHTML = `<p class="mb-6 text-2xl font-semibold text-gray-100">${q.question}</p>`;
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

        q.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add('quiz-option-btn', 'px-4', 'py-3', 'bg-blue-600', 'rounded', 'hover:bg-blue-700', 'text-lg', 'w-full');
            button.onclick = () => selectAnswer(option, q, button, optionsGrid);
            optionsGrid.appendChild(button);
        });
        quizContainer.appendChild(optionsGrid);
        quizFeedback.textContent = "";
        ikaChanQuizImg.src = ikaChanDefaultSrc;
        ikaChanQuizImg.classList.add('hidden');
        nextQuestionBtn.classList.add('hidden');
    }

    function selectAnswer(option, questionData, clickedButton, optionsGrid) {
        // Disable all buttons after an answer is selected
        const allButtons = optionsGrid.querySelectorAll('.quiz-option-btn');
        allButtons.forEach(btn => {
            btn.disabled = true;
            // Highlight correct and wrong answers
            const correspondingOption = questionData.options.find(opt => opt.text === btn.textContent);
            if (correspondingOption.correct) {
                btn.classList.add('correct');
            } else if (btn === clickedButton && !option.correct) {
                btn.classList.add('wrong');
            }
        });


        if (option.correct) {
            quizFeedback.textContent = questionData.feedbackCorrect;
            quizFeedback.className = 'mt-4 text-xl text-green-400';
            ikaChanQuizImg.src = ikaChanHappySrc;
            score++;
        } else {
            quizFeedback.textContent = questionData.feedbackWrong;
            quizFeedback.className = 'mt-4 text-xl text-red-400';
            ikaChanQuizImg.src = ikaChanThinkingSrc;
        }
        ikaChanQuizImg.classList.remove('hidden');
        nextQuestionBtn.classList.remove('hidden');

        if (currentQuestionIndex >= questions.length -1) {
            nextQuestionBtn.textContent = "Show Results";
        }
    }

    function showFinalScore() {
        quizContainer.innerHTML = `<p class="text-3xl font-bold text-center text-purple-400">Quiz Complete!</p>
                                   <p class="text-2xl text-center text-gray-200 mt-4">You scored ${score} out of ${questions.length}!</p>`;
        if (score === questions.length) {
            quizFeedback.textContent = "Wow! Ika-chan is super impressed! You're an Ika expert! 🎉🥳";
            ikaChanQuizImg.src = ikaChanHappySrc;
        } else if (score >= questions.length / 2) {
            quizFeedback.textContent = "Great job! Ika-chan says you've learned a lot about Ika! 👍";
            ikaChanQuizImg.src = ikaChanHappySrc;
        } else {
            quizFeedback.textContent = "Good effort! Ika-chan encourages you to explore more to become an Ika whiz! 😊";
            ikaChanQuizImg.src = ikaChanThinkingSrc;
        }
        quizFeedback.className = 'mt-4 text-xl text-center'; // Centered feedback
        ikaChanQuizImg.classList.remove('hidden');
        nextQuestionBtn.classList.add('hidden');
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    });

    // Initialize Quiz
    if (quizContainer) {
        loadQuestion(currentQuestionIndex);
    }
});