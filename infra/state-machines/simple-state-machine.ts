import { Duration, Fn } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sf from "aws-cdk-lib/aws-stepfunctions";
import * as stepfunctions from "aws-cdk-lib/aws-stepfunctions";
import {
    Succeed,
    IStateMachine,
    LogLevel,
    Choice,
    Condition,
    Fail,
} from "aws-cdk-lib/aws-stepfunctions";
import * as logs from "aws-cdk-lib/aws-logs";

export class SimpleStateMachine extends Construct {
    private _stateMachine: sf.StateMachine;

    get stateMachine(): IStateMachine {
        return this._stateMachine;
    }

    constructor(scope: Construct, id: string) {
        super(scope, id);
        this.finalizeStateMachine(scope);
    }

    /**
     * Sets up the state machine. Brings in the roles, permissions and appropriate keys and whatnot
     * to allow the state machine to do its thing
     *
     *  @param {Construct} scope - the context for the state machine
     */
    finalizeStateMachine = (scope: Construct) => {
        const logGroup = new logs.LogGroup(this, "CloudwatchLogs", {
            logGroupName: "/aws/vendedlogs/states/main-user-updater",
        });

        const flow = this.buildStateMachine(scope);

        this._stateMachine = new stepfunctions.StateMachine(
            this,
            "StateMachine",
            {
                stateMachineName: "SimpleStateMachine",
                definition: flow,
                stateMachineType: stepfunctions.StateMachineType.EXPRESS,
                timeout: Duration.seconds(30),
                logs: {
                    level: LogLevel.ALL,
                    destination: logGroup,
                    includeExecutionData: true,
                },
            }
        );
    };

    /**
     * Creates the workflow for the state machine.  Builds transitions and errors/catches/retries
     *
     *  @param {Construct} scope - the context for the state machine
     */
    buildStateMachine = (scope: Construct): stepfunctions.IChainable => {
        const succeed = new Succeed(scope, "Succeed");
        const failure = new Fail(scope, "Fail");

        return (
            new Choice(this, "Success or Failure")
                // Look at the "status" field
                .when(Condition.stringEquals("$.path", "Succeed"), succeed)
                .when(Condition.stringEquals("$.path", "Fail"), failure)
                .otherwise(failure)
        );
    };
}
