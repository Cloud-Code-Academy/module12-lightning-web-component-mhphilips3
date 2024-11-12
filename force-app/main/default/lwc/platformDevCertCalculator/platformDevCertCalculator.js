/**
 * LWC Component: PlatformDevCertCalculator
 * Purpose: This component calculates a certification score based on user-entered scores for different categories, 
 *          displays the result, and provides a history of previous attempts. It also suggests resources if the score is below passing.
 * 
 * Variables:
 * - devFundWeight, processAutoWeight, userIntWeight, testDebugWeight: Category weights used for score calculation.
 * - passingScore: The minimum score required to pass.
 * - devFundamentalsScore, processAutomationScore, userInterfaceScore, testDebugDeployScore: User-entered scores.
 * - certificationScore: Calculated certification score.
 * - numberOfQuestions: Total number of questions in the certification exam.
 * - showResources, showGoodJob: Flags to control resource suggestion and congratulatory messages.
 * - attemptHistory: Array to store previous attempts.
 * - currentHistoryId: Tracks the latest attempt ID.
 */
import { LightningElement} from 'lwc';
    const devFundWeight = 0.23;
    const processAutoWeight = 0.30;
    const userIntWeight = 0.25;
    const testDebugWeight = 0.22;
    const passingScore = 68;

export default class PlatformDevCertCalculator extends LightningElement {
    
    devFundamentalsScore = 50;
    processAutomationScore = 50;
    userInterfaceScore = 50;
    testDebugDeployScore = 50;
    certificationScore = 50;
    numberOfQuestions = 60;

    showResources = false;

    currentHistoryId = 0;
    showGoodJob = false;

    attemptHistory = [
        {Id: 1, Score:50},
        {Id: 2, Score:68},
        {Id: 3, Score:70}];
            
    /**
     * Method: calculateScore
     * Purpose: Calculates the overall certification score based on category scores and weights, 
     *          updates the certificationScore property, and adds the attempt to history.
     */
    calculateScore(){
        let devFundWeightScore = this.devFundamentalsScore * devFundWeight;
        let processAutoWeightScore = this.processAutomationScore * processAutoWeight;
        let userIntWeightScore = this.userInterfaceScore * userIntWeight;
        let testDebugWeightScore = this.testDebugDeployScore * testDebugWeight;

        this.certificationScore = devFundWeightScore + processAutoWeightScore + userIntWeightScore + testDebugWeightScore;

        this.showResourcesIfFailed();
        this.addAttemptHistory(this.certificationScore);        
    }

    /**
     * Method: handleChange
     * Purpose: Updates the component's category score properties based on user input from the lightning-input elements.
     * @param event - the event object from the input change.
     */
    handleChange(event){
        console.log(event.target.name, event.target.value);
        console.log(event.target.type);
        console.log(event.target.label);
        const inputName = event.target.name;
        let value = Number(event.target.value);
        if (inputName === 'devFundamentals'){
            this.devFundamentalsScore = value;
        } else if (inputName === 'userInterface'){
            this.userInterfaceScore = value;
        } else if (inputName === 'processAuto'){
            this.processAutomationScore = value;
        } else if (inputName === 'testDebugDeploy'){
            this.testDebugDeployScore = value;
        }
    }
    
    /**
     * Method: showResourcesIfFailed
     * Purpose: Sets flags to display resources if the certification score is below the passing threshold; 
     *          otherwise, shows a congratulatory message.
     */
    showResourcesIfFailed(){
        if (this.certificationScore < passingScore){
            this.showResources = true;
        } else {
            this.showResources = false;
        }
        this.showGoodJob = !this.showResources;
    }   
    
    /**
     * Method: addAttemptHistory
     * Purpose: Adds the current attempt's score to the attemptHistory array.
     * @param Score - the calculated score to be added to the history.
     */
    addAttemptHistory(Score){        
        this.currentHistoryId ++;
        const attempt = 
        {
            Id: this.currentHistoryId, Score
        }
        this.attemptHistory = [...this.attemptHistory, attempt];
    }
/**
     * Method: deleteAttemptHandler
     * Purpose: Handles the deletion of an attempt from the attemptHistory array based on an event from the child component.
     * @param event - the event object containing the attempt ID to delete.
     */
    deleteAttemptHandler(event){
        console.log('this is called from parent to handle delete', event.detail);
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
        console.log('New attempt history' + this.attemptHistory);
    }

    /**
     * Method: connectedCallback
     * Purpose: Initializes the currentHistoryId based on the length of the existing attemptHistory array.
     */
    connectedCallback(){
        this.currentHistoryId = this.attemptHistory.length;
    }
    
}