import { SecretValue, Stack } from "aws-cdk-lib";
import {
    CodePipeline,
    CodePipelineSource,
    ShellStep,
} from "aws-cdk-lib/pipelines";

import { Construct } from "constructs";

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const pipeline = new CodePipeline(this, "Pipeline", {
            pipelineName: "SamplePipeline",
            synth: new ShellStep("Synth", {
                input: CodePipelineSource.gitHub(
                    "benbpyle/cdk-step-functions-local-testing",
                    "main",
                    {
                        authentication: SecretValue.secretsManager(
                            "sf-sample",
                            {
                                jsonField: "github",
                            }
                        ),
                    }
                ),
                commands: ["npx cdk synth"],
            }),
        });

        // pipeline.addStage(new InfraStage(this, `${props.options.stackNamePrefix}-${props.options.stackName}-Prod`, {
        //     options: props.options,
        //     stage: StageEnvironment.PROD,
        //     env: {
        //         account: props.options.productionAccount,
        //         region: props.options.defaultRegion
        //     },
        // }));
    }
}
