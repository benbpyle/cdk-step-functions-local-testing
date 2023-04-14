/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = require("child_process");

console.log("*************************");
console.log("*   Starting Test Runs  *");
console.log("*************************");

// cdk-asl-definition-extractor
const out = JSON.parse(
    exec
        .execSync(
            "cdk-asl-definition-extractor  -f cdk.out/LocalTesting.template.json"
        )
        .toString()
);

console.log("*************************");
console.log("* Adding State Machines *");
console.log("*************************");

if (Array.isArray(out)) {
    for (let i = 0; i < out.length; i++) {
        const command = `aws stepfunctions --endpoint-url http://localhost:8083 create-state-machine --definition ${JSON.stringify(
            out[i].definition
        )} --name ${
            out[i].identifier
        } --role-arn "arn:aws:iam::012345678901:role/DummyRole" --type "EXPRESS" `;
        exec.execSync(command);
    }
}
