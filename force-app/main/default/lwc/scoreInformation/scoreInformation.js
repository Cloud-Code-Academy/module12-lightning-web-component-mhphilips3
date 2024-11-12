/**
 * LWC Component: ScoreInformation
 * Purpose: Displays detailed scoring information for each certification attempt, including the 
 *          number of correct and incorrect answers. It also allows users to delete an attempt.
 * 
 * Properties:
 * - score: The percentage score achieved in the attempt.
 * - attemptId: The unique identifier for each attempt.
 * - numberOfQuestions: The total number of questions in the certification exam.
 *  
 */

import { api, LightningElement } from 'lwc';

export default class ScoreInformation extends LightningElement {
    @api score;  // The percentage score of this attempt
    @api attemptId; // The unique identifier for this attempt
    @api numberOfQuestions; // The total number of questions in the certification exam

    /**
     * Calculates the number of correct answers based on the score percentage.
     * @returns {number} The calculated number of correct answers.
     */
    get numberOfQuestionsCorrect(){
        return Math.floor((this.score/100) * this.numberOfQuestions);
    }

    /**
     * Calculates the number of incorrect answers by subtracting the correct answers from the total.
     * @returns {number} The calculated number of incorrect answers.
     */
    get numberOfQuestionsIncorrect(){
        return this.numberOfQuestions - this.numberOfQuestionsCorrect;
    }

    /**
     * Handles the deletion of this attempt by dispatching a custom 'deleteattempt' event.
     * This event is listened to by the parent component to remove the attempt from history.
     * @fires deleteattempt - Custom event sent to the parent with the attemptId as the detail.
     */
    handleDeleteAttempt(){
        console.log('handleDeleteAttempt', this.attemptId);
        const deleteEvent = new CustomEvent('deleteattempt', {
            detail: this.attemptId
        });
        this.dispatchEvent(deleteEvent);
    }

}