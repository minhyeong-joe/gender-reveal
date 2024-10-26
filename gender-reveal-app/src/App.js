import React, { useState, useEffect } from "react";
import Confetti from "react-confetti"; // Import the Confetti component
import "./App.css"; // Make sure you have the styles in App.css

// Balloon sound file path
const popSound = new Audio(process.env.PUBLIC_URL + "/pop.mp3");

// Function to shuffle the array
const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

function App() {
	const initialBalloons = [
		{ id: 1, isBoy: false, popped: false },
		{ id: 2, isBoy: false, popped: false },
		{ id: 3, isBoy: false, popped: false },
		{ id: 4, isBoy: true, popped: false }, // This balloon reveals the boy gender
	];

	const [balloons, setBalloons] = useState(shuffleArray(initialBalloons)); // Shuffle on initialization
	const [revealed, setRevealed] = useState(false);
	const [gender, setGender] = useState(null);
	const [isClickable, setIsClickable] = useState(true); // State to track if balloons are clickable

	const handlePop = (isBoy, id) => {
		// Play sound
		popSound.play();

		// Update balloon state to mark as popped
		const updatedBalloons = balloons.map((balloon) =>
			balloon.id === id ? { ...balloon, popped: true } : balloon
		);

		setBalloons(updatedBalloons); // Update the balloons state
		setRevealed(true);
		setGender(isBoy ? "Boy" : "Try again!");

		// Disable clicking if the popped balloon reveals the boy gender
		if (isBoy) {
			setIsClickable(false); // Disable further clicks on remaining balloons
		}
	};

	return (
		<div className="app">
			<header className="app-header">
				<h1>Gender Reveal Game</h1>
				<p>Pop a balloon to find out!</p>
				<div className="balloons-container">
					{balloons.map(
						(balloon) =>
							!balloon.popped && ( // Only show balloons that haven't been popped
								<div
									key={balloon.id}
									className={`balloon ${balloon.popped ? "popped" : ""}`}
									onClick={
										isClickable
											? () => handlePop(balloon.isBoy, balloon.id)
											: null
									} // Disable clicking if not clickable
								>
									🎈
								</div>
							)
					)}
				</div>
				{revealed && (
					<div className="reveal-message">
						{gender === "Boy" && (
							<>
								<Confetti
									width={window.innerWidth}
									height={window.innerHeight}
									numberOfPieces={800} // Increase density
									recycle={false} // Prevent recycling for a one-time effect
									gravity={0.2} // Faster falling confetti
									initialVelocityY={10} // Shoot confetti up faster
								/>{" "}
								{/* Add confetti effect */}
								<img
									src={`${process.env.PUBLIC_URL}/its-a-boy.png`}
									alt="It's a boy!"
									className="gender-image"
								/>
							</>
						)}
						{gender === "Try again!" && <p>Pick another balloon!</p>}
					</div>
				)}
			</header>
		</div>
	);
}

export default App;
