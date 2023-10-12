#!/usr/bin/local node
import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';

let totalCorrect = 0;

class Question {
    constructor(question, answersArray, correctAnswerIndex) {
        this.question = question;
        this.answersArray = answersArray;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}

async function askQuestion(question, answers, correctAnswerIndex) {
    const options = [];
    answers.forEach((answer) => {
        options.push({value: answer, label: answer});
    });

    const answer = await p.select({
        message: question,
        initialValue: 1,
        options: options,
    });

    const s = p.spinner();
	s.start();
	await setTimeout(1000);
	s.stop();

    if (answer == answers[correctAnswerIndex]) {
        totalCorrect++;
    }
}

async function main() {
	console.clear();

	await setTimeout(1000);
	
    p.intro(`${color.bgMagenta(color.black(' Welcome. Let us find out how much of an Earth expert you REALLY are. '))}`);

    const question1 = new Question(
		"1) How old is the Earth?",
		[
		"4.5 Billion Years",
		"13.8 Billion Years",
		"6000 Years",
		"2.1 Billion Years"],
		0,
	)

	const question2 = new Question(
		"2)  What percent of the Earth is covered with water?",
		["90%", "70%", "60%", "80"],
		1,
	)

	const question3 = new Question(
		"3) How fast does Earth travel as it orbits the sun?",
		[
		"670,000 MPH",
		"6,700 MPH",
		"670 MPH",
		"67,000 MPH"],
		3,
	)

    const allQuestions = [question1, question2, question3]
    
    // Ask if the player is ready
	const readyToPlay = await p.select({
		message: "No cheating. 3 questions. Results at the end. Ready to play?",
		initialValue: "Yes",
		options: [
			{value: "Yes", label: "Yes"},
			{value: "No", label: "No"}],
	})

    if (readyToPlay == "Yes") {
		// Begin trivia game
		for (const question of allQuestions) {
			await askQuestion(question.question, question.answersArray, question.correctAnswerIndex);
		}

		// Decide what ending screen to show based on how many questions user answered correctly
		p.outro(`${color.bgMagenta(color.black(`You got ${totalCorrect} questions correct!`))}`);
	
    
	} else {
		p.outro(`${color.bgMagenta(color.black(`Bye!`))}`);
	}
}

main().catch(console.error);