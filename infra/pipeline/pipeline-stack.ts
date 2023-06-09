import { SecretValue, Stack } from "aws-cdk-lib";
import {
    BuildEnvironmentVariableType,
    BuildSpec,
    LinuxBuildImage,
} from "aws-cdk-lib/aws-codebuild";
import {
    CodePipeline,
    CodePipelineSource,
    ShellStep,
} from "aws-cdk-lib/pipelines";

import { Construct } from "constructs";
import { PipelineStage } from "./pipeline-stage";

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        const pipeline = new CodePipeline(this, "Pipeline", {
            pipelineName: "SamplePipeline",
            dockerEnabledForSynth: true,
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
                commands: [
                    "npm i",
                    "npm i cdk-asl-definition-extractor -g",
                    // "npx cdk synth",
                    "make test-start-local",
                ],
            }),
            synthCodeBuildDefaults: {
                buildEnvironment: {
                    buildImage: LinuxBuildImage.STANDARD_6_0,
                    environmentVariables: {
                        DOCKERHUB_USERNAME: {
                            type: BuildEnvironmentVariableType.SECRETS_MANAGER,
                            value: "dockerhub:username",
                        },
                        DOCKERHUB_PASSWORD: {
                            type: BuildEnvironmentVariableType.SECRETS_MANAGER,
                            value: "dockerhub:password",
                        },
                    },
                },
                partialBuildSpec: BuildSpec.fromObject({
                    phases: {
                        install: {
                            "runtime-versions": {
                                nodejs: "16",
                            },
                            commands: [
                                "docker login --username $DOCKERHUB_USERNAME --password $DOCKERHUB_PASSWORD",
                            ],
                        },
                    },
                }),
            },
        });

        pipeline.addStage(new PipelineStage(this, "PipelineStage"));
    }
}
