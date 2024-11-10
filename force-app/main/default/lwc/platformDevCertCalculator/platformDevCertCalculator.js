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
        
        

    calculateScore(){
        let devFundWeightScore = this.devFundamentalsScore * devFundWeight;
        let processAutoWeightScore = this.processAutomationScore * processAutoWeight;
        let userIntWeightScore = this.userInterfaceScore * userIntWeight;
        let testDebugWeightScore = this.testDebugDeployScore * testDebugWeight;

        this.certificationScore = devFundWeightScore + processAutoWeightScore + userIntWeightScore + testDebugWeightScore;

        this.showResourcesIfFailed();
        this.addAttemptHistory(this.certificationScore);
        
    }

    
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
    
    showResourcesIfFailed(){
        if (this.certificationScore < passingScore){
            this.showResources = true;
        } else {
            this.showResources = false;
        }
        this.showGoodJob = !this.showResources;
    }   
    
    addAttemptHistory(Score){        
        this.currentHistoryId ++;
        const attempt = 
        {
            Id: this.currentHistoryId, Score
        }
        this.attemptHistory = [...this.attemptHistory, attempt];
    }

    deleteAttemptHandler(event){
        console.log('this is called from parent to handle delete', event.detail);
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
        console.log('New attempt history' + this.attemptHistory);
    }

    connectedCallback(){
        this.currentHistoryId = this.attemptHistory.length;
    }
    
}