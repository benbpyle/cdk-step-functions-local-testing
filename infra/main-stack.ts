import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { SimpleStateMachine } from "./state-machines/simple-state-machine";

export class MainStack extends cdk.Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        new SimpleStateMachine(this, "SimpleStateMachine");
    }
}
