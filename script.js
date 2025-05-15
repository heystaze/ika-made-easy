<!-- script.js -->
document.querySelectorAll('.quiz-btn').forEach(button => {
    button.addEventListener('click', () => {
        const result = document.getElementById('quiz-result');
        if (button.dataset.answer === 'correct') {
            result.textContent = 'Great job! Ika-chan says: A dWallet is a secure, programmable wallet that works across blockchains! 🌟';
            result.classList.add('text-green-400');
            result.classList.remove('text-red-400');
        } else {
            result.textContent = 'Oops! Ika-chan says: A dWallet is a secure, programmable wallet. Try again! 😊';
            result.classList.add('text-red-400');
            result.classList.remove('text-green-400');
        }
    });
});

// Add a subtle bounce animation to Ika-chan on page load
document.addEventListener('DOMContentLoaded', () => {
    const ikaChan = document.getElementById('ika-chan');
    ikaChan.classList.add('bounce');
});