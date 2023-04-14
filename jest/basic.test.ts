/* eslint-disable @typescript-eslint/no-explicit-any */
import { SFNClient, StartSyncExecutionCommand } from "@aws-sdk/client-sfn";

describe("SF Integration Tests", () => {
    const client = new SFNClient({
        region: "us-west-2",
        endpoint: "http://localhost:8083",
        disableHostPrefix: true,
    });

    it("Should Fail No Path", async () => {
        const startCommand = new StartSyncExecutionCommand({
            stateMachineArn:
                "arn:aws:states:us-west-2:123456789012:stateMachine:SimpleStateMachine3C32178E",
        });

        const startOutput = await client.send(startCommand);
        expect(startOutput.status).toBe("FAILED");
    });

    it("Should Succeed Success Path", async () => {
        const startCommand = new StartSyncExecutionCommand({
            stateMachineArn:
                "arn:aws:states:us-west-2:123456789012:stateMachine:SimpleStateMachine3C32178E",
            input: '{"path": "Succeed"}',
        });

        const startOutput = await client.send(startCommand);
        expect(startOutput.status).toBe("SUCCEEDED");
    });

    it("Should Fail Failure Path", async () => {
        const startCommand = new StartSyncExecutionCommand({
            stateMachineArn:
                "arn:aws:states:us-west-2:123456789012:stateMachine:SimpleStateMachine3C32178E",
            input: '{"path": "Fail"}',
        });

        const startOutput = await client.send(startCommand);
        expect(startOutput.status).toBe("FAILED");
    });
});
