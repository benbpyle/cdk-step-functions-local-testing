import { Stage } from "aws-cdk-lib";
import { MainStack } from "../main-stack";
import { Construct } from "constructs";

export class PipelineStage extends Stage {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new MainStack(this, "AppStage");
    }
}
